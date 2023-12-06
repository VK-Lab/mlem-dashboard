"use client";

import { useAccount } from "@casperdash/usewallet";
import { useRouter } from "next/navigation";

import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";
import { NFTAsset } from "@mlem-user/components/nft-asset";
import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { Paths } from "@mlem-user/enums/paths";
import { useCheckNFTIsLuckyBox } from "@mlem-user/services/app/nft/hooks/useCheckNFTIsLuckyBox";
import { useGetNFT } from "@mlem-user/services/app/nft/hooks/useGetNFT";
import { cn } from "@mlem-user/utils";

import { BenefitItem } from "./components/benefit-item";
import { ButtonOpenBox } from "./components/button-open-box";
import { TokenDetails } from "./components/token-details";

type NFTDetailProps = {
  className?: string;
  contractPackageHash: string;
  tokenId: string;
};

export const NFTDetail = ({ contractPackageHash, tokenId }: NFTDetailProps) => {
  const router = useRouter();
  const { data, isLoading } = useGetNFT(
    {
      contractPackageHash,
      tokenId,
    },
    {
      onError: () => {
        router.push(Paths.MY_NFTS);
      },
    }
  );
  const { publicKey } = useAccount();
  const { data: isLuckyBox } = useCheckNFTIsLuckyBox({
    contractPackageHash,
    tokenId,
  });

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-8 justify-center">
      <div className="basis-[300px]">
        <NFTAsset className="w-[300px] h-[350px]" url={data?.imageUrl} />
        <div className={cn({ "mt-6": isLuckyBox })}>
          <ButtonOpenBox
            contractPackageHash={contractPackageHash}
            tokenId={tokenId}
            isLuckyBox={isLuckyBox}
          />
        </div>
      </div>
      <div className="flex-1 max-w-[300px]">
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
