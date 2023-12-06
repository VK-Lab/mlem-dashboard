"use client";

import { useAccount } from "@casperdash/usewallet";

import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";
import { NFTAsset } from "@mlem-user/components/nft-asset";
import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { useCheckNFTIsLuckyBox } from "@mlem-user/services/app/nft/hooks/useCheckNFTIsLuckyBox";
import { useGetNFT } from "@mlem-user/services/app/nft/hooks/useGetNFT";

import { BenefitItem } from "./components/benefit-item";
import { ButtonOpenBox } from "./components/button-open-box";
import { TokenDetails } from "./components/token-details";

type NFTDetailProps = {
  className?: string;
  contractPackageHash: string;
  tokenId: string;
};

export const NFTDetail = ({ contractPackageHash, tokenId }: NFTDetailProps) => {
  const { data, isLoading } = useGetNFT({
    contractPackageHash,
    tokenId,
  });
  const { publicKey } = useAccount();
  const { data: isLuckyBox } = useCheckNFTIsLuckyBox({
    contractPackageHash,
    tokenId,
  });

  console.log("isLuckyBox", isLuckyBox);

  if (isLoading) {
    return (
      <div className="mt-10">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="w-[800px] flex flex-row gap-8">
      <div className="basis-[360px]">
        <NFTAsset className="w-[360px] h-[360px]" url={data?.imageUrl} />
        {isLuckyBox && (
          <div className="mt-6">
            <ButtonOpenBox
              contractPackageHash={contractPackageHash}
              tokenId={tokenId}
            />
          </div>
        )}
      </div>
      <div className="flex-1">
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

        {data?.benefits && data?.benefits.length > 0 && (
          <div className="mt-6">
            <p className="font-bold">Benefits</p>
            <div className="flex flex-col mt-4 gap-6">
              {data?.benefits.map((benefit) => (
                <BenefitItem
                  key={`benefit-${benefit.id}`}
                  nftId={data.id}
                  benefit={benefit}
                  contractPackageHash={contractPackageHash}
                  tokenId={tokenId}
                />
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col">
          {/* <NFTAttributes /> */}
          <TokenDetails nft={data} />
        </div>
      </div>
    </div>
  );
};
