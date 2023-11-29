import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";

import { getTotalWhitelistUsers } from "..";

type Params = { campaignId: string };

export const useGetTotalWhitelistUsers = (
  { campaignId }: Params,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      number,
      [QueryKeys.CAMPAIGN, QueryKeys.WHITELIST, Params, "total"]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [
      QueryKeys.CAMPAIGN,
      QueryKeys.WHITELIST,
      {
        campaignId,
      },
      "total",
    ],
    async () => {
      const { total = 0 } = await getTotalWhitelistUsers(campaignId);

      return Math.min(total + 20, 99);
    },
    {
      ...options,
      enabled: !!campaignId,
    }
  );
};
