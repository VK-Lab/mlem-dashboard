"use client";

import { formatDate } from "@mlem-user/lib/date";
import { NFTMinter } from "@mlem-user/modules/core/nft-minter";
import { useGetCampaign } from "@mlem-user/services/campaign/hooks/useGetCampaign";
import _first from "lodash-es/first";
import Image from "next/image";

type CampaignDetailProps = {
  campaignId: string;
};

export const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data, isLoading } = useGetCampaign(campaignId);
  if (isLoading) {
    return <div>loading...</div>;
  }

  const nftCollection = _first(data?.nftCollections || []);
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="relative h-80 w-full">
          <Image src={data?.imageUrl || ""} fill={true} alt="Campaign Image" />
        </div>
        <h3 className="mt-8 typo-h3">{data?.name}</h3>
        <div className="mt-4 text-center">{data?.description}</div>
        <div className="mt-4">
          {formatDate(data?.startDate)} - {formatDate(data?.endDate)}
        </div>
        <NFTMinter nftCollection={nftCollection} className="mt-10" />
      </div>
    </div>
  );
};
