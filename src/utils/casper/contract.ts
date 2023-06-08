import { sign } from '@usedapptesthello/usewallet-core';
import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import _kebabCase from 'lodash/kebabCase';

import { generateMetadataUrl } from '../metadata';
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
} from '@/contracts/cep78';
import { deploy } from '@/services/casperdash/deploy';
import { getDeploy } from '@/utils/casper/account';

export type SignDeployNftCollectionParams = {
  publicKeyHex: string;
  name: string;
};

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  tokenAddress: string;
  tokenId: string;
  paymentAmount?: string;
};

export type TransferDeployNftParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  tokenAddress: string;
  tokenId: string;
  paymentAmount?: string;
};

export type ApproveDeployNftParams = {
  fromPublicKeyHex: string;
  tokenId: string;
  paymentAmount?: string;
  tokenAddress: string;
};

export const signDeployNftCollection = async ({
  publicKeyHex,
  name,
}: SignDeployNftCollectionParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const installDeploy = await CEP78ClientInstance.install(
    {
      collectionName: _kebabCase(name),
      collectionSymbol: 'MELEM',
      totalTokenSupply: '1000',
      ownershipMode: NFTOwnershipMode.Transferable,
      nftKind: NFTKind.Digital,
      mintingMode: MintingMode.Installer,
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
  tokenAddress: string,
  publicKeyHex: string
) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);

  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

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
    contractHash: tokenAddress,
    deployHash,
  };
};

export const signDeployNft = async (
  {
    publicKeyHex,
    name,
    tokenAddress,
    tokenId,
    paymentAmount = '20000000000',
  }: SignDeployNftParams,
  { isWaiting = false }: { isWaiting: boolean } = { isWaiting: false }
) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);

  const meta = {
    name: name,
    token_uri: generateMetadataUrl(tokenAddress, tokenId),
  };

  const mintDeploy = await CEP78ClientInstance.mint(
    {
      owner: cliPublicKey,
      meta: {
        ...meta,
        checksum: btoa(JSON.stringify(meta)),
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

  return deployHash;
};

export const sendNft = async (
  {
    fromPublicKeyHex,
    toPublicKeyHex,
    tokenAddress,
    tokenId,
    paymentAmount = '30000000000',
  }: TransferDeployNftParams,
  { isWaiting = false }: { isWaiting: boolean } = { isWaiting: false }
) => {
  const clFromPublicKey = CLPublicKey.fromHex(fromPublicKeyHex);
  const clToPublicKey = CLPublicKey.fromHex(toPublicKeyHex);

  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  const sendDeploy = await CEP78ClientInstance.transfer(
    {
      source: clFromPublicKey,
      target: clToPublicKey,
      tokenId: tokenId,
    },
    { useSessionCode: false },
    paymentAmount,
    clFromPublicKey
  );

  const signedDeploy = await sign({
    deploy: DeployUtil.deployToJson(sendDeploy),
    signingPublicKeyHex: fromPublicKeyHex,
    targetPublicKeyHex: toPublicKeyHex,
  });

  const deployHash = await deploy(signedDeploy);

  if (isWaiting) {
    await getDeploy(deployHash);
  }

  return deployHash;
};

export const approveNft = async ({
  fromPublicKeyHex,
  paymentAmount = '10000000000',
  tokenId,
  tokenAddress,
}: ApproveDeployNftParams) => {
  const clFromPublicKey = CLPublicKey.fromHex(fromPublicKeyHex);
  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  const approveDeploy = await CEP78ClientInstance.approve(
    {
      operator: clFromPublicKey,
      tokenId: tokenId,
    },
    paymentAmount,
    clFromPublicKey
  );

  const signedDeploy = await sign({
    deploy: DeployUtil.deployToJson(approveDeploy),
    signingPublicKeyHex: fromPublicKeyHex,
    targetPublicKeyHex: fromPublicKeyHex,
  });

  const deployHash = await deploy(signedDeploy);

  return deployHash;
};
