"use client";
import Link from "next/link";

import { useGetNFTs } from "@mlem-user/services/app/nft/hooks/useGetNFTs";

import { NFTItem } from "./components/nft-item";

export const ListNFTs = () => {
  const { data: nfts = [] } = useGetNFTs();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {nfts.map((item) => {
        return (
          <div key={item.id}>
            <Link href={`/my-nfts/${item.contractPackageHash}/${item.tokenId}`}>
              <NFTItem nft={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
