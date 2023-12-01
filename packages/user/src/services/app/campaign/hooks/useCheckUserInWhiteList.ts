import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";

import { checkUserInWhiteList } from "..";
import { CheckUserInWhiteListResponse } from "../types";

type Params = { publicKey: string; campaignId?: string };

export const useCheckUserInWhiteList = (
  { publicKey, campaignId }: Params,
  options?: Omit<
    UseQueryOptions<
      CheckUserInWhiteListResponse,
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
    async () => {
      if (!campaignId) {
        throw new Error("campaignId is required");
      }

      return checkUserInWhiteList({ publicKey, campaignId });
    },
    {
      ...options,
      enabled: !!publicKey && !!campaignId,
    }
  );
};
