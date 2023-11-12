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
  NFTHolderMode,
  EventsMode,
} from '@mlem-admin/contracts/cep78';
import { deploy } from '@mlem-admin/services/proxy';
import {
  getAccountInfo,
  getAccountNamedKeyValue,
  getDeploy,
} from '@mlem-admin/utils/casper/account';
import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import _kebabCase from 'lodash/kebabCase';

import { generateMetadataUrl } from '../metadata';

export type SignDeployNftCollectionParams = {
  publicKeyHex: string;
  name: string;
  symbol: string;
  totalTokenSupply: number;
  mintingMode: MintingMode;
};

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  nftId: string;
  paymentAmount?: string;
  tokenAddress: string;
};

export const signDeployNftCollection = async ({
  publicKeyHex,
  name,
  symbol,
  totalTokenSupply,
  mintingMode,
}: SignDeployNftCollectionParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const installDeploy = await CEP78ClientInstance.install(
    {
      collectionName: _kebabCase(name),
      collectionSymbol: symbol,
      totalTokenSupply: `${totalTokenSupply}`,
      ownershipMode: NFTOwnershipMode.Transferable,
      nftKind: NFTKind.Digital,
      mintingMode,
      holderMode: NFTHolderMode.Mixed,
      allowMinting: true,
      nftMetadataKind: NFTMetadataKind.CEP78,
      identifierMode: NFTIdentifierMode.Ordinal,
      metadataMutability: MetadataMutability.Immutable,
      ownerReverseLookupMode: OwnerReverseLookupMode.TransfersOnly,
      eventsMode: EventsMode.CES,
    },
    '300000000000',
    cliPublicKey
  );

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

export const signDeployNft = async (
  {
    publicKeyHex,
    name,
    nftId,
    paymentAmount = '5000000000',
    tokenAddress,
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

  const mintDeploy = await CEP78ClientInstance.mint(
    {
      owner: cliPublicKey,
      meta: {
        ...meta,
        checksum,
      },
    },
    { useSessionCode: true },
    paymentAmount,
    cliPublicKey
  );

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