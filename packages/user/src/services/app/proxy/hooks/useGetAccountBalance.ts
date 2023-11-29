import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { toCSPR } from "@mlem-user/lib/format";

import { getAccountBalance } from "..";
import { GetAccountBalanceResponse } from "../types";

export const useGetAccountBalance = (
  { publicKey }: { publicKey?: string | null },
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetAccountBalanceResponse,
      [QueryKeys.ACCOUNT_BALANCE, string | null | undefined]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [QueryKeys.ACCOUNT_BALANCE, publicKey],
    async () => {
      if (!publicKey) {
        throw new Error("Can not get account");
      }
      const { balance } = await getAccountBalance(publicKey);

      return {
        balance: toCSPR(balance),
      };
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};
