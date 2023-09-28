"use client";

import { formatDate } from "@mlem-user/lib/date";
import { useGetCampaign } from "@mlem-user/services/campaign/hooks/useGetCampaign";
import Image from "next/image";

import { ListCampaigns } from "../list-campaigns";

type CampaignDetailProps = {
  campaignId: string;
};

export const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data, isLoading } = useGetCampaign(campaignId);
  if (isLoading) {
    return <div>loading...</div>;
  }

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
      </div>
      <div className="mt-10">
        <div className="typo-h4">Explore More</div>
        <div className="mt-4">
          <ListCampaigns />
        </div>
      </div>
    </div>
  );
};
