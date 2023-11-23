import { BigNumber } from "@ethersproject/bignumber";
import { Config } from "@mlem-user/config";
import Big from "big.js";
import {
  CLPublicKey,
  CLKey,
  RuntimeArgs,
  Contracts,
  Keys,
  CLValueBuilder,
} from "casper-js-sdk";

import {
  CallConfig,
  ConfigurableVariables,
  MintArgs,
  BurnMode,
  WhitelistMode,
  NFTHolderMode,
  NFTIdentifierMode,
  MetadataMutability,
  NFTOwnershipMode,
  NFTMetadataKind,
  NFTKind,
  OwnerReverseLookupMode,
} from "./types";
import MintFeeWasm from "./wasm/mint_fee.wasm";

const { Contract } = Contracts;

export * from "./types";

enum ERRORS {
  CONFLICT_CONFIG = "Conflicting arguments provided",
}

const convertHashStrToHashBuff = (hashStr: string) => {
  let hashHex = hashStr;
  if (hashStr.startsWith("hash-")) {
    hashHex = hashStr.slice(5);
  }
  return Buffer.from(hashHex, "hex");
};

const buildKeyHashList = (list: string[]) =>
  list.map((hashStr) =>
    CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(hashStr))
    )
  );

export class CEP78Client {
  public contractClient: Contracts.Contract;

  public contractHashKey!: CLKey;

  constructor(public networkName: string) {
    this.contractClient = new Contract();
  }

  public setContractHash(contractHash: string, contractPackageHash?: string) {
    this.contractClient.setContractHash(contractHash, contractPackageHash);
    this.contractHashKey = CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(contractHash))
    );
  }

  public async collectionName() {
    return this.contractClient.queryContractData(["collection_name"]);
  }

  public async collectionSymbol() {
    return this.contractClient.queryContractData(["collection_symbol"]);
  }

  public async tokenTotalSupply() {
    return this.contractClient.queryContractData(["total_token_supply"]);
  }

  public async numOfMintedTokens() {
    const numberOfMintedTokens = await this.contractClient.queryContractData([
      "number_of_minted_tokens",
    ]);

    const u8res = (numberOfMintedTokens as BigNumber).toNumber();

    return u8res;
  }

  public async getContractWhitelist() {
    return this.contractClient.queryContractData(["contract_whitelist"]);
  }

  public async getAllowMintingConfig() {
    return this.contractClient.queryContractData(["allow_minting"]);
  }

  public async getReportingModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "reporting_mode",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return OwnerReverseLookupMode[u8res] as keyof typeof OwnerReverseLookupMode;
  }

  public async getWhitelistModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "whitelist_mode",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return WhitelistMode[u8res] as keyof typeof WhitelistMode;
  }

  public async getBurnModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "burn_mode",
    ]);
    const u8res: string = (internalValue as BigNumber).toString();
    return (BurnMode as unknown as Record<string, string>)[
      u8res
    ] as keyof typeof BurnMode;
  }

  public async getHolderModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "holder_mode",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTHolderMode[u8res] as keyof typeof NFTHolderMode;
  }

  public async getIdentifierModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "identifier_mode",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTIdentifierMode[u8res] as keyof typeof NFTIdentifierMode;
  }

  public async getMetadataMutabilityConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "metadata_mutability",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return MetadataMutability[u8res] as keyof typeof MetadataMutability;
  }

  public async getNFTKindConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "nft_kind",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTKind[u8res] as keyof typeof NFTKind;
  }

  public async getMetadataKindConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "nft_metadata_kind",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTMetadataKind[u8res] as keyof typeof NFTMetadataKind;
  }

  public async getOwnershipModeConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "ownership_mode",
    ]);
    const u8res = (internalValue as BigNumber).toNumber();
    return NFTOwnershipMode[u8res] as keyof typeof NFTOwnershipMode;
  }

  public async getJSONSchemaConfig() {
    const internalValue = await this.contractClient.queryContractData([
      "json_schema",
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
        "allow_minting",
        CLValueBuilder.bool(args.allowMinting)
      );
    }

    if (args.contractWhitelist !== undefined) {
      const list = buildKeyHashList(args.contractWhitelist);
      runtimeArgs.insert("contract_whitelist", CLValueBuilder.list(list));
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      "set_variables",
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      keys
    );

    return preparedDeploy;
  }

  public async mintWithFee(
    args: MintArgs,
    mintingFee: number,
    paymentAmount: string,
    deploySender: CLPublicKey
  ) {
    return this.mint(
      {
        ...args,
        mintingFee: new Big(mintingFee).mul(10 ** 9).toString(),
      },
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
      runtimeArgs.insert("nft_contract_hash", this.contractHashKey);
      if (args.mintingFee !== undefined) {
        runtimeArgs.insert("amount", CLValueBuilder.u512(args.mintingFee));
      }

      const preparedDeploy = this.contractClient.install(
        wasm!,
        runtimeArgs,
        paymentAmount,
        deploySender,
        this.networkName
      );

      return preparedDeploy;
    }

    const preparedDeploy = this.contractClient.callEntrypoint(
      "mint",
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount
    );

    return preparedDeploy;
  }
}

export const CEP78ClientInstance = new CEP78Client(Config.networkName);
