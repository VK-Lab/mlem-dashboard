"use client";

import { CampaignItem } from "@mlem-user/components/cards/CampaignItem";
import { useGetCampaigns } from "@mlem-user/services/app/campaign/hooks/useGetCampaigns";

export const ListCampaigns = () => {
  const { data, isLoading } = useGetCampaigns();

  if (isLoading) {
    return null;
  }

  return (
    <div className="fex">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.items?.map((item) => (
          <CampaignItem key={item.id} campaign={item} />
        ))}
      </div>
    </div>
  );
};
