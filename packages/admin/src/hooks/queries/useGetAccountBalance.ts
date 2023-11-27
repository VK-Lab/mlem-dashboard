import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getAccounts } from '@mlem-admin/services/casperdash/user';
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
      const accounts = await getAccounts({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKeys: [publicKey!],
      });
      if (!accounts || accounts.length === 0) {
        throw new Error('Can not get account');
      }

      const [account] = accounts;
      const balanceHex = _get(account, 'balance.hex', '');

      return {
        balance: hexToNumber(balanceHex),
      };
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchOnWindowFocus: true,
    }
  );
};
