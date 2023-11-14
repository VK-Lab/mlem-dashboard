import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { hexToNumber } from "@mlem-user/lib/format";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import _get from "lodash-es/get";

import { getAccounts } from "../user.service";

type GetAccountBalanceResponse = {
  balanace: number;
};

export const useGetAccountBalance = (
  { publicKey }: { publicKey?: string | null },
  options?: Omit<
    UseQueryOptions<
      GetAccountBalanceResponse,
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
      const accounts = await getAccounts({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKeys: [publicKey!],
      });
      if (!accounts || accounts.length === 0) {
        throw new Error("Can not get account");
      }

      const [account] = accounts;
      const balanceHex = _get(account, "balance.hex", "");

      return {
        balanace: hexToNumber(balanceHex),
      };
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};
