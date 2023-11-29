"use client";

import { useAccount } from "@casperdash/usewallet";

import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";
import { NFTAsset } from "@mlem-user/components/nft-asset";
import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { useGetNFT } from "@mlem-user/services/app/nft/hooks/useGetNFT";

import { BenefitItem } from "./components/benefit-item";
import { TokenDetails } from "./components/token-details";

type NFTDetailProps = {
  className?: string;
  tokenAddress: string;
  tokenId: string;
};

export const NFTDetail = ({ tokenAddress, tokenId }: NFTDetailProps) => {
  const { data, isLoading } = useGetNFT({
    tokenAddress,
    tokenId,
  });
  const { publicKey } = useAccount();

  if (isLoading) {
    return (
      <div className="mt-10">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div className="flex flex-col flex-wrap">
        <NFTAsset className="w-[400px] h-[400px]" url={data?.imageUrl} />
        <div className="flex flex-col">
          {/* <NFTAttributes /> */}
          <TokenDetails nft={data} />
        </div>
      </div>
      <div className="flex-auto">
        <div className="typo-h3">{data?.name}</div>
        <div className="mt-4 flex items-center gap-2">
          <GradientAvatar name={publicKey || ""} size={20} />
          <span className="text-xs font-bold">{publicKey?.slice(-8)}</span>
        </div>
        <div className="mt-4">
          <p>
            {data?.description === "" ? "No description" : data?.description}
          </p>
        </div>
        <div className="mt-6">
          <p className="font-bold">Benefits</p>
          <div className="flex flex-col mt-4 gap-6">
            {data?.benefits.map((benefit) => (
              <BenefitItem
                key={`benefit-${benefit.id}`}
                nftId={data.id}
                benefit={benefit}
                tokenAddress={tokenAddress}
                tokenId={tokenId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
