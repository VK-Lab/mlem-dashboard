import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getCampaigns } from "..";
import { GetCampaignsResponse } from "../types";

export const useGetCampaigns = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetCampaignsResponse,
      [QueryKeys.GET_CAMPAIGNS]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery([QueryKeys.GET_CAMPAIGNS], () => getCampaigns(), {
    ...options,
  });
};
