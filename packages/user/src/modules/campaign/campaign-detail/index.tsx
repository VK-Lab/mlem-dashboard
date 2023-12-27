"use client";
import { useMemo } from "react";

import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { useGetTotalTokenSupply } from "@mlem-user/hooks/contract/useGetTotalTokenSupply";
import { useGetCampaign } from "@mlem-user/services/app/campaign/hooks/useGetCampaign";
import { useGetTotalNFTs } from "@mlem-user/services/app/nft-collection/hooks/use-get-total-nfts";

import { CampaignInformation } from "./campaign-information";

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
      <div
        style={{
          minHeight: "65vh",
        }}
        className="bg-campaign"
      >
        <div className="md:w-2/5 px-2 py-6 md:py-12 md:px-3 md:pl-6  md:justify-center md:flex md:flex-col">
          <div>
            <div className="shadow-md">
              <img src={data?.imageUrl} />
            </div>
          </div>
        </div>
        <div className="md:w-3/5 px-2 md:px-16 text-gray-50 pb-12 pt-12 md:justify-center md:flex md:flex-col">
          <div>
            <CampaignInformation campaignId={campaignId} />
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center"></div>
    </div>
  );
};
