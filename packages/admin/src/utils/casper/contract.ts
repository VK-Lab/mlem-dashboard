import { sign } from '@casperdash/usewallet-core';
import {
  NFTOwnershipMode,
  NFTKind,
  NFTMetadataKind,
  NFTIdentifierMode,
  MetadataMutability,
  MintingMode,
  CEP78ClientInstance,
  OwnerReverseLookupMode,
  EventsMode,
} from '@mlem-admin/contracts/cep78';
import { deploy } from '@mlem-admin/services/proxy';
import {
  getAccountInfo,
  getAccountNamedKeyValue,
  getDeploy,
} from '@mlem-admin/utils/casper/account';
import Big from 'big.js';
import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import _kebabCase from 'lodash/kebabCase';

import { generateMetadataUrl } from '../metadata';

export type SignDeployNftCollectionParams = {
  publicKeyHex: string;
  name: string;
  symbol: string;
  totalTokenSupply: number;
  mintingMode: MintingMode;
  mintingFee?: string | number;
};

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  nftId: string;
  paymentAmount?: string;
  isAllowMintingFee?: boolean;
  mintingFee?: number;
  tokenAddress: string;
};

export const signDeployNftCollection = async ({
  publicKeyHex,
  name,
  symbol,
  totalTokenSupply,
  mintingMode,
  mintingFee,
}: SignDeployNftCollectionParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const args = {
    collectionName: _kebabCase(name),
    collectionSymbol: symbol,
    totalTokenSupply: `${totalTokenSupply}`,
    ownershipMode: NFTOwnershipMode.Transferable,
    nftKind: NFTKind.Digital,
    nftMetadataKind: NFTMetadataKind.CEP78,
    identifierMode: NFTIdentifierMode.Ordinal,
    metadataMutability: MetadataMutability.Immutable,
    ownerReverseLookupMode: OwnerReverseLookupMode.Complete,
    eventsMode: EventsMode.CES,
    mintingMode,
  };

  let installDeploy;
  if (mintingFee) {
    installDeploy = await CEP78ClientInstance.installMintingFeeContract(
      {
        ...args,
        mintingFee: new Big(mintingFee).mul(10 ** 9).toString(),
      },
      `${300_000_000_000}`,
      cliPublicKey
    );
  } else {
    installDeploy = await CEP78ClientInstance.install(
      args,
      `${300_000_000_000}`,
      cliPublicKey
    );
  }
  const signedDeploy = await sign({
    deploy: DeployUtil.deployToJson(installDeploy),
    signingPublicKeyHex: publicKeyHex,
    targetPublicKeyHex: publicKeyHex,
  });

  const deployHash = await deploy(signedDeploy);

  return {
    deployHash,
  };
};

export const registerTokenOwner = async (
  collectionName: string,
  publicKeyHex: string
) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const accountInfo = await getAccountInfo(cliPublicKey);

  const contractHash = getAccountNamedKeyValue(
    accountInfo,
    `cep78_contract_hash_${_kebabCase(collectionName)}`
  );
  if (!contractHash) {
    throw new Error('Can not get contract hash');
  }

  CEP78ClientInstance.setContractHash(contractHash, undefined);

  const registerDeployTwo = CEP78ClientInstance.register(
    {
      tokenOwner: cliPublicKey,
    },
    '10000000000',
    cliPublicKey
  );
  const signedRegisterDeploy = await sign({
    deploy: DeployUtil.deployToJson(registerDeployTwo),
    signingPublicKeyHex: publicKeyHex,
    targetPublicKeyHex: publicKeyHex,
  });

  const deployHash = await deploy(signedRegisterDeploy);

  return {
    contractHash: contractHash.replace('hash-', ''),
    deployHash,
  };
};

const ESTIMATED_FEE = 17_140_849_620;

export const signDeployNft = async (
  {
    publicKeyHex,
    name,
    nftId,
    paymentAmount = `${5_000_000_000}`,
    tokenAddress,
    isAllowMintingFee,
    mintingFee,
  }: SignDeployNftParams,
  { isWaiting = false }: { isWaiting: boolean } = { isWaiting: false }
) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const meta = {
    name: name,
    token_uri: generateMetadataUrl(nftId),
  };
  const checksum = btoa(JSON.stringify(meta));
  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  let mintDeploy;

  if (isAllowMintingFee) {
    mintDeploy = await CEP78ClientInstance.mintWithFeeContract(
      {
        owner: cliPublicKey,
        meta: {
          ...meta,
          checksum,
        },
        mintingFee: new Big(mintingFee || 0).mul(10 ** 9).toString(),
      },
      `${ESTIMATED_FEE}`,
      cliPublicKey
    );
  } else {
    mintDeploy = await CEP78ClientInstance.mint(
      {
        owner: cliPublicKey,
        meta: {
          ...meta,
          checksum,
        },
      },
      { useSessionCode: false },
      paymentAmount,
      cliPublicKey
    );
  }

  const signedDeploy = await sign({
    deploy: DeployUtil.deployToJson(mintDeploy),
    signingPublicKeyHex: publicKeyHex,
    targetPublicKeyHex: publicKeyHex,
  });

  const deployHash = await deploy(signedDeploy);

  if (isWaiting) {
    await getDeploy(deployHash);
  }

  return {
    deployHash,
    checksum,
  };
};
