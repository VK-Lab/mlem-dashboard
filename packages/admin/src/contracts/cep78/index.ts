import { BigNumber } from '@ethersproject/bignumber';
import { Config } from '@mlem-admin/config';
import {
  CLMap,
  CLString,
  CLPublicKey,
  CLKey,
  RuntimeArgs,
  CasperClient,
  Contracts,
  Keys,
  CLValueBuilder,
  CLU8,
} from 'casper-js-sdk';

import {
  CallConfig,
  InstallArgs,
  NamedKeyConventionMode,
  ConfigurableVariables,
  MintArgs,
  RegisterArgs,
  BurnArgs,
  ApproveArgs,
  ApproveAllArgs,
  TransferArgs,
  BurnMode,
  WhitelistMode,
  NFTHolderMode,
  NFTIdentifierMode,
  MetadataMutability,
  NFTOwnershipMode,
  NFTMetadataKind,
  NFTKind,
  TokenMetadataArgs,
  OwnerReverseLookupMode,
} from './types';
import ContractWasm from './wasm/contract.wasm';
import MintCallWasm from './wasm/mint_call.wasm';
import MintFeeWasm from './wasm/mint_fee.wasm';

const { Contract } = Contracts;

export * from './types';

enum ERRORS {
  CONFLICT_CONFIG = 'Conflicting arguments provided',
}

const convertHashStrToHashBuff = (hashStr: string) => {
  let hashHex = hashStr;
  if (hashStr.startsWith('hash-')) {
    hashHex = hashStr.slice(5);
  }
  return Buffer.from(hashHex, 'hex');
};

const buildKeyHashList = (list: string[]) =>
  list.map((hashStr) =>
    CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(hashStr))
    )
  );

export class CEP78Client {
  private casperClient: CasperClient;

  public contractClient: Contracts.Contract;

  public contractHashKey!: CLKey;

  constructor(public nodeAddress: string, public networkName: string) {
    this.casperClient = new CasperClient(nodeAddress);
    this.contractClient = new Contract(this.casperClient);
  }

  public async install(
    args: InstallArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    wasm?: Uint8Array
  ) {
    const wasmToInstall = wasm || ContractWasm;

    if (
      args.identifierMode === NFTIdentifierMode.Hash &&
      args.metadataMutability === MetadataMutability.Mutable
    ) {
      throw new Error(
        `You can't combine NFTIdentifierMode.Hash and MetadataMutability.Mutable`
      );
    }

    const runtimeArgs = RuntimeArgs.fromMap({
      collection_name: CLValueBuilder.string(args.collectionName),
      collection_symbol: CLValueBuilder.string(args.collectionSymbol),
      total_token_supply: CLValueBuilder.u64(args.totalTokenSupply),
      ownership_mode: CLValueBuilder.u8(args.ownershipMode),
      nft_kind: CLValueBuilder.u8(args.nftKind),
      nft_metadata_kind: CLValueBuilder.u8(args.nftMetadataKind),
      identifier_mode: CLValueBuilder.u8(args.identifierMode),
      metadata_mutability: CLValueBuilder.u8(args.metadataMutability),
    });

    if (args.jsonSchema !== undefined) {
      runtimeArgs.insert(
        'json_schema',
        CLValueBuilder.string(JSON.stringify(args.jsonSchema))
      );
    }

    if (args.mintingMode !== undefined) {
      runtimeArgs.insert('minting_mode', CLValueBuilder.u8(args.mintingMode));
    }

    if (args.allowMinting !== undefined) {
      runtimeArgs.insert(
        'allow_minting',
        CLValueBuilder.bool(args.allowMinting)
      );
    }

    if (args.whitelistMode !== undefined) {
      runtimeArgs.insert(
        'whitelist_mode',
        CLValueBuilder.u8(args.whitelistMode)
      );
    }

    if (args.holderMode !== undefined) {
      runtimeArgs.insert('holder_mode', CLValueBuilder.u8(args.holderMode));
    }

    if (args.contractWhitelist !== undefined) {
      const list = buildKeyHashList(args.contractWhitelist);
      runtimeArgs.insert('contract_whitelist', CLValueBuilder.list(list));
    }

    if (args.burnMode !== undefined) {
      runtimeArgs.insert('burn_mode', CLValueBuilder.u8(args.burnMode));
    }

    if (args.ownerReverseLookupMode !== undefined) {
      runtimeArgs.insert(
        'owner_reverse_lookup_mode',
        CLValueBuilder.u8(args.ownerReverseLookupMode)
      );
    }

    if (args.namedKeyConventionMode !== undefined) {
      runtimeArgs.insert(
        'named_key_convention',
        CLValueBuilder.u8(args.namedKeyConventionMode)
      );
    }

    if (args.namedKeyConventionMode === NamedKeyConventionMode.V1_0Custom) {
      if (!args.accessKeyName || !args.hashKeyName) {
        throw new Error(
          "You need to provide 'accessKeyName' and 'hashKeyName' if you want to use NamedKeyConventionMode.V1_0Custom"
        );
      }
      runtimeArgs.insert(
        'access_key_name',
        CLValueBuilder.string(args.accessKeyName)
      );
      runtimeArgs.insert(
        'hash_key_name',
        CLValueBuilder.string(args.hashKeyName)
      );
    }

    if (args.eventsMode !== undefined) {
      runtimeArgs.insert('events_mode', CLValueBuilder.u8(args.eventsMode));
    }

    return this.contractClient.install(
      wasmToInstall,
      runtimeArgs,
      paymentAmount,
      deploySender,
      this.networkName,
      []
    );
  }

  public setContractHash(contractHash: string, contractPackageHash?: string) {
    this.contractClient.setContractHash(contractHash, contractPackageHash);
    this.contractHashKey = CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(contractHash))
    );
  }

  public async collectionName() {
    return this.contractClient.queryContractData(['collection_name']);
  }

  public async collectionSymbol() {
    return this.contractClient.queryContractData(['collection_symbol']);
  }

  public async tokenTotalSupply() {
    return this.contractClient.queryContractData(['total_token_supply']);
  }

  public async numOfMintedTokens() {
    const numberOfMintedTokens = await this.contractClient.queryContractData([
      'number_of_minted_tokens',
    ]);

    const u8res = (numberOfMintedTokens as BigNumber).toNumber();

    return u8res;
  }

  public async getContractWhitelist() {
    return this.contractClient.queryContractData(['contract_whitelist']);
  }

  public async getAllowMintingConfig() {
    return this.contractClient.queryContractData(['allow_minting']);
  }

  public async getReportingModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'reporting_mode',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return OwnerReverseLookupMode[u8res] as keyof typeof OwnerReverseLookupMode;
  }

  public async getWhitelistModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'whitelist_mode',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return WhitelistMode[u8res] as keyof typeof WhitelistMode;
  }

  public async getBurnModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'burn_mode',
    ]);
    const u8res: string = (internalValue as BigNumber).toString();
    return (BurnMode as unknown as Record<string, string>)[
      u8res
    ] as keyof typeof BurnMode;
  }

  public async getHolderModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'holder_mode',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTHolderMode[u8res] as keyof typeof NFTHolderMode;
  }

  public async getIdentifierModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'identifier_mode',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTIdentifierMode[u8res] as keyof typeof NFTIdentifierMode;
  }

  public async getMetadataMutabilityConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'metadata_mutability',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return MetadataMutability[u8res] as keyof typeof MetadataMutability;
  }

  public async getNFTKindConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'nft_kind',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTKind[u8res] as keyof typeof NFTKind;
  }

  public async getMetadataKindConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'nft_metadata_kind',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTMetadataKind[u8res] as keyof typeof NFTMetadataKind;
  }

  public async getOwnershipModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'ownership_mode',
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTOwnershipMode[u8res] as keyof typeof NFTOwnershipMode;
  }

  public async getJSONSchemaConfig() {
    const internalValue = await this.contractClient.queryContractData([
      'json_schema',
    ]);
    return internalValue.toString();
  }

  public setVariables(
    args: ConfigurableVariables,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({});

    if (args.allowMinting !== undefined) {
      runtimeArgs.insert(
        'allow_minting',
        CLValueBuilder.bool(args.allowMinting)
      );
    }

    if (args.contractWhitelist !== undefined) {
      const list = buildKeyHashList(args.contractWhitelist);
      runtimeArgs.insert('acl_whitelist', CLValueBuilder.list(list));
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      'set_variables',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public register(
    args: RegisterArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      token_owner: CLValueBuilder.key(args.tokenOwner),
    });

    const preparedDeploy = this.contractClient.callEntrypoint(
      'register_owner',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public async mintWithFeeContract(
    args: MintArgs,
    paymentAmount: string,
    deploySender: CLPublicKey
  ) {
    return this.mint(
      args,
      { useSessionCode: true },
      paymentAmount,
      deploySender,
      MintFeeWasm
    );
  }

  public async mint(
    args: MintArgs,
    config: CallConfig,
    paymentAmount: string,
    deploySender: CLPublicKey,
    wasm?: Uint8Array
  ) {
    if (config.useSessionCode === false && !!wasm)
      throw new Error(ERRORS.CONFLICT_CONFIG);

    const runtimeArgs = RuntimeArgs.fromMap({
      token_owner: CLValueBuilder.key(args.owner),
      token_meta_data: CLValueBuilder.string(JSON.stringify(args.meta)),
    });

    if (config.useSessionCode) {
      runtimeArgs.insert('nft_contract_hash', this.contractHashKey);
      if (args.collectionName) {
        runtimeArgs.insert(
          'collection_name',
          CLValueBuilder.string(args.collectionName)
        );
      }

      const preparedDeploy = this.contractClient.install(
        wasm || MintCallWasm,
        runtimeArgs,
        paymentAmount,
        deploySender,
        this.networkName
      );

      return preparedDeploy;
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      'mint',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount
    );

    return preparedDeploy;
  }

  public burn(
    args: BurnArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({});

    if (args.tokenId !== undefined) {
      runtimeArgs.insert('token_id', CLValueBuilder.u64(args.tokenId));
    }

    if (args.tokenHash !== undefined) {
      runtimeArgs.insert('token_hash', CLValueBuilder.string(args.tokenHash));
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      'burn',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public async transfer(
    args: TransferArgs,
    config: CallConfig,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[],
    wasm?: Uint8Array
  ) {
    if (config.useSessionCode === false && !!wasm)
      throw new Error(ERRORS.CONFLICT_CONFIG);

    const runtimeArgs = RuntimeArgs.fromMap({
      target_key: CLValueBuilder.key(args.target),
      source_key: CLValueBuilder.key(args.source),
    });

    if (args.tokenId) {
      runtimeArgs.insert('is_hash_identifier_mode', CLValueBuilder.bool(false));
      runtimeArgs.insert('token_id', CLValueBuilder.u64(args.tokenId));
    }

    if (args.tokenHash) {
      runtimeArgs.insert('is_hash_identifier_mode', CLValueBuilder.bool(true));
      runtimeArgs.insert('token_id', CLValueBuilder.u64(args.tokenHash));
    }

    if (config.useSessionCode) {
      runtimeArgs.insert('nft_contract_hash', this.contractHashKey);
      const wasmToCall = wasm;

      const preparedDeploy = this.contractClient.install(
        wasmToCall!,
        runtimeArgs,
        paymentAmount,
        deploySender,
        this.networkName,
        keys
      );

      return preparedDeploy;
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      'transfer',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public setTokenMetadata(
    args: TokenMetadataArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      token_meta_data: CLValueBuilder.string(
        JSON.stringify(args.tokenMetaData)
      ),
    });

    const preparedDeploy = this.contractClient.callEntrypoint(
      'set_token_metadata',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public async getOwnerOf(tokenId: string) {
    const result = await this.contractClient.queryContractDictionary(
      'token_owners',
      tokenId
    );

    return `account-hash-${(result as CLKey).toJSON()}`;
  }

  public async getMetadataOf(tokenId: string, metadataType?: NFTMetadataKind) {
    const metadataToCheck: NFTMetadataKind =
      metadataType || NFTMetadataKind[await this.getMetadataKindConfig()];

    const mapMetadata = {
      [NFTMetadataKind.CEP78]: 'metadata_cep78',
      [NFTMetadataKind.NFT721]: 'metadata_nft721',
      [NFTMetadataKind.Raw]: 'metadata_raw',
      [NFTMetadataKind.CustomValidated]: 'metadata_custom_validated',
    };

    const result = await this.contractClient.queryContractDictionary(
      mapMetadata[metadataToCheck],
      tokenId
    );

    const clMap = result as CLMap<CLString, CLString>;

    return clMap.toJSON() as { [key: string]: string };
  }

  public async getBalanceOf(account: CLPublicKey) {
    const result = await this.contractClient.queryContractDictionary(
      'balances',
      account.toAccountHashStr().slice(13)
    );

    return (result as CLU8).toJSON();
  }

  public approve(
    args: ApproveArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      operator: CLValueBuilder.key(args.operator),
    });

    if (args.tokenId !== undefined) {
      runtimeArgs.insert('token_id', CLValueBuilder.u64(args.tokenId));
    }

    if (args.tokenHash !== undefined) {
      runtimeArgs.insert('token_hash', CLValueBuilder.string(args.tokenHash));
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      'approve',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public approveAll(
    args: ApproveAllArgs,
    paymentAmount: string,
    deploySender: CLPublicKey,
    keys?: Keys.AsymmetricKey[]
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      token_owner: CLValueBuilder.key(args.tokenOwner),
      approve_all: CLValueBuilder.bool(args.approveAll),
      operator: CLValueBuilder.key(args.operator),
    });

    const preparedDeploy = this.contractClient.callEntrypoint(
      'set_approval_for_all',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }
}

export const CEP78ClientInstance = new CEP78Client(
  Config.nodeRPCUrl,
  Config.networkName
);
