import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { Campaign } from "@mlem-user/types/campaign";

import { getFeaturedCampaigns } from "..";

export const useGetFeaturedCampaigns = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Campaign[],
      [QueryKeys.GET_FEATURED_CAMPAIGNS]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [QueryKeys.GET_FEATURED_CAMPAIGNS],
    () => getFeaturedCampaigns(),
    {
      ...options,
    }
  );
};
