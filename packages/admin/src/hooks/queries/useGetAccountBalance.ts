import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getAccountBalance } from '@mlem-admin/services/proxy';
import { hexToNumber } from '@mlem-admin/utils/format';
import { useQuery, UseQueryOptions } from 'react-query';

type GetAccountBalanceResponse = {
  balance: number;
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
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.ACCOUNT_BALANCE, publicKey],
    async () => {
      if (!publicKey) {
        throw new Error('Can not get account');
      }
      const { balance } = await getAccountBalance(publicKey);

      return {
        balance: hexToNumber(balance),
      };
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};
