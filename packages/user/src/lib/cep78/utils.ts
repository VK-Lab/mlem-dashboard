"use client";

import { Config } from "@mlem-user/config";
import { CLPublicKey } from "casper-js-sdk";
import urlJoin from "url-join";

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
  isAllowMintingFee,
  mintingFee,
}: SignDeployNftParams) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const meta = {
    name: name,
    token_uri: generateMetadataUrl(nftId),
  };
  const checksum = btoa(JSON.stringify(meta));
  CEP78ClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  let deploy;

  if (isAllowMintingFee) {
    deploy = await CEP78ClientInstance.mintWithFee(
      {
        owner: cliPublicKey,
        meta: {
          ...meta,
          checksum,
        },
      },
      mintingFee || 0,
      `${17140849620}`,
      cliPublicKey
    );
  } else {
    deploy = await CEP78ClientInstance.mint(
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
  }

  return {
    deploy,
    checksum,
  };
};
