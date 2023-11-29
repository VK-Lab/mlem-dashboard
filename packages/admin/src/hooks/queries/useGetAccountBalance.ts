import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getAccounts } from '@mlem-admin/services/casperdash/user';
import { getAccountBalance } from '@mlem-admin/services/proxy';
import { hexToNumber } from '@mlem-admin/utils/format';
import _get from 'lodash/get';
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
