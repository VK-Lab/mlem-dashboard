import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { Campaign } from "@mlem-user/types/campaign";

import { getRunningCampaigns } from "..";

export const useGetRunningCampaigns = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Campaign[],
      [QueryKeys.GET_RUNNING_CAMPAIGNS]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [QueryKeys.GET_RUNNING_CAMPAIGNS],
    () => getRunningCampaigns(),
    {
      ...options,
    }
  );
};
