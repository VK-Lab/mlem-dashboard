import { sign } from '@casperdash/usewallet-core';
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
import {
  getAccountInfo,
  getAccountNamedKeyValue,
  getDeploy,
} from '@/utils/casper/account';

export type SignDeployNftCollectionParams = {
  publicKeyHex: string;
  name: string;
  symbol: string;
  totalTokenSupply: number;
};

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  tokenAddress: string;
  tokenId: string;
  paymentAmount?: string;
};

export const signDeployNftCollection = async ({
  publicKeyHex,
  name,
  symbol,
  totalTokenSupply,
}: SignDeployNftCollectionParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const installDeploy = await CEP78ClientInstance.install(
    {
      collectionName: _kebabCase(name),
      collectionSymbol: symbol,
      totalTokenSupply: `${totalTokenSupply}`,
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
