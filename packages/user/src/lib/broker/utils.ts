"use client";

import { Config } from "@mlem-user/config";
import { CLPublicKey } from "casper-js-sdk";
import urlJoin from "url-join";

import { BrokerClientInstance } from ".";

export const generateMetadataUrl = (nftId: string) => {
  return urlJoin(Config.metadataBaseUrl, nftId, "metadata");
};

export const signDeployBrokerMintNft = async (
  tokenAddress: string,
  {
    token,
    name,
    nftId,
    amount,
    publicKeyHex,
  }: {
    name: string;
    nftId: string;
    publicKeyHex: string;
    token: string;
    amount: number;
  }
) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const meta = {
    name: name,
    token_uri: generateMetadataUrl(nftId),
  };
  const checksum = btoa(JSON.stringify(meta));
  BrokerClientInstance.setContractHash(`hash-${tokenAddress}`, undefined);

  const deploy = BrokerClientInstance.mint(
    {
      token: token,
      meta: {
        ...meta,
        checksum,
      },
      owner: publicKeyHex,
      amount: amount,
    },
    cliPublicKey
  );

  return {
    deploy,
    checksum,
  };
};
