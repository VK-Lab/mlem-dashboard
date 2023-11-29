"use client";

import { CLPublicKey } from "casper-js-sdk";
import urlJoin from "url-join";

import { Config } from "@mlem-user/config";

import { CEP78ClientInstance } from ".";

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  nftId: string;
  paymentAmount?: string;
  tokenAddress: string;
  isAllowMintingFee?: boolean;
  mintingFee?: number;
};

export const generateMetadataUrl = (nftId: string) => {
  return urlJoin(Config.metadataBaseUrl, nftId, "metadata");
};

export const signDeployNft = async ({
  publicKeyHex,
  name,
  nftId,
  paymentAmount = `${5_000_000_000}`,
  tokenAddress,
}: SignDeployNftParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const meta = {
    name: name,
    token_uri: generateMetadataUrl(nftId),
  };
  const checksum = btoa(JSON.stringify(meta));
  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  const deploy = await CEP78ClientInstance.mint(
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

  return {
    deploy,
    checksum,
  };
};

export const signDeployNftWithFee = async ({
  publicKeyHex,
  name,
  nftId,
  paymentAmount = `${5_000_000_000}`,
  tokenAddress,
  mintingFee,
}: SignDeployNftParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const meta = {
    name: name,
    token_uri: generateMetadataUrl(nftId),
  };
  const checksum = btoa(JSON.stringify(meta));
  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  if (!mintingFee) {
    throw new Error("Minting fee is required");
  }

  const deploy = await CEP78ClientInstance.mintWithFee(
    {
      owner: cliPublicKey,
      meta: {
        ...meta,
        checksum,
      },
    },
    mintingFee,
    paymentAmount,
    cliPublicKey
  );

  return {
    deploy,
    checksum,
  };
};
