import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { checkUserInWhiteList } from "..";
import { CheckUserInWhiteListResponse } from "../types";

type Params = { publicKey: string; campaignId: string };

export const useCheckUserInWhiteList = (
  { publicKey, campaignId }: Params,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      CheckUserInWhiteListResponse,
      [QueryKeys.CAMPAIGN, QueryKeys.WHITELIST, Params]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [
      QueryKeys.CAMPAIGN,
      QueryKeys.WHITELIST,
      {
        publicKey,
        campaignId,
      },
    ],
    () => checkUserInWhiteList({ publicKey, campaignId }),
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
