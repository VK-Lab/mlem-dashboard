import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { Campaign } from "@mlem-user/types/campaign";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCampaingDetail } from "..";

export const useGetCampaign = (
  id: string,
  options?: Omit<
    UseQueryOptions<unknown, unknown, Campaign, [QueryKeys.CAMPAIGN, string]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery([QueryKeys.CAMPAIGN, id], () => getCampaingDetail(id), {
    ...options,
  });
};
