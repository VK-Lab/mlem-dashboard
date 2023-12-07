"use client";
import { useAccount } from "@casperdash/usewallet";
import Link from "next/link";

import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { ButtonConnect } from "@mlem-user/modules/@core/button-connect";
import { useGetNFTs } from "@mlem-user/services/app/nft/hooks/useGetNFTs";

import { NFTItem } from "./components/nft-item";

export const ListNFTs = () => {
  const { publicKey } = useAccount();
  const { data: nfts = [], isLoading } = useGetNFTs();

  if (isLoading && publicKey) {
    return (
      <div className="mt-20 flex justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {publicKey ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {nfts.map((item) => {
              return (
                <div key={item.id}>
                  <Link
                    href={`/my-nfts/${item.contractPackageHash}/${item.tokenId}`}
                  >
                    <NFTItem nft={item} />
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <ButtonConnect className="mt-12" buttonText={"Connect Your Wallet"} />
      )}
    </div>
  );
};
