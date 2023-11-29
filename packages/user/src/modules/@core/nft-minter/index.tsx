"use client";

import { NftCollection } from "@mlem-user/types/nft-collection";

import { ButtonMint } from "./button-mint";

type NFTMinterProps = {
  nftCollection?: NftCollection;
};

export const NFTMinter = ({ nftCollection }: NFTMinterProps) => {
  if (!nftCollection) {
    return null;
  }

  return (
    <ButtonMint
      params={{
        name: nftCollection.name,
        description: nftCollection.description,
        contractPackageHash: nftCollection.contractPackageHash,
        imageUrl: nftCollection.nftImageUrl,
        tokenAddress: nftCollection.tokenAddress,
        broker: nftCollection.broker,
      }}
    />
  );
};
