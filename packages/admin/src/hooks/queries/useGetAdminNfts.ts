import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNfts } from '@mlem-admin/services/admin/nft';
import { GetNftsResponse } from '@mlem-admin/services/admin/nft/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetAdminNfts = (
  options?: Omit<
    UseQueryOptions<
      GetNftsResponse,
      unknown,
      GetNftsResponse,
      [QueryKeys.LIST_NFTS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.LIST_NFTS], () => getNfts(), {
    ...options,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  });
};
