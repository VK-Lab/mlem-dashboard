"use client";

import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { CampaignStatusEnum } from "@mlem-user/enums/campaign-status";
import { CampaignTypesEnum } from "@mlem-user/enums/campaign-types";
import { formatDate } from "@mlem-user/lib/date";
import { NFTMinter } from "@mlem-user/modules/core/nft-minter";
import { useGetCampaign } from "@mlem-user/services/app/campaign/hooks/useGetCampaign";
import Image from "next/image";

type CampaignDetailProps = {
  campaignId: string;
};

export const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data, isLoading } = useGetCampaign(campaignId);
  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="relative h-[520px] w-full">
          <Image src={data?.imageUrl || ""} fill={true} alt="Campaign Image" />
        </div>
        <h3 className="mt-8 typo-h3">{data?.name}</h3>
        <div className="mt-4 text-center">{data?.description}</div>
        <div className="mt-4">
          {formatDate(data?.startDate)} - {formatDate(data?.endDate)}
        </div>
        <div>
          {data?.type === CampaignTypesEnum.FREE_MINT &&
            data?.status === CampaignStatusEnum.RUNNING &&
            data?.nftCollections && (
              <div className="mt-4 flex gap-4">
                {data.nftCollections.map((nftCollection) => (
                  <div key={nftCollection.id}>
                    <NFTMinter nftCollection={nftCollection} />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
