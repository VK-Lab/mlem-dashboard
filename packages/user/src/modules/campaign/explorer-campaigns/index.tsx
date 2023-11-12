"use client";

import { useMemo } from "react";

import { CampaignItem } from "@mlem-user/components/cards/CampaignItem";
import { useGetRunningCampaigns } from "@mlem-user/services/app/campaign/hooks/useGetRunningCampaigns";

type Props = {
  excludedIds?: string[];
};

export const ExplorerCampaigns = ({ excludedIds }: Props) => {
  const { data, isLoading } = useGetRunningCampaigns();

  const filteredCampaigns = useMemo(() => {
    return data?.filter((item) => {
      return !excludedIds?.includes(item.id);
    });
  }, [data, excludedIds]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredCampaigns?.map((item) => (
        <CampaignItem key={item.id} campaign={item} />
      ))}
    </div>
  );
};
