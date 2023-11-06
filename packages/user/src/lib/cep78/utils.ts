"use client";

import { sign } from "@casperdash/usewallet-core";
import { Config } from "@mlem-user/config";
import { deploy } from "@mlem-user/services/proxy";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";
import urlJoin from "url-join";

import { CEP78ClientInstance } from ".";

export type SignDeployNftParams = {
  publicKeyHex: string;
  name: string;
  nftId: string;
  paymentAmount?: string;
  tokenAddress: string;
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
    { useSessionCode: true },
    paymentAmount,
    cliPublicKey
  );

  return {
    deploy,
    checksum,
  };
};
