import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNfts } from '@mlem-admin/services/nft';
import { Nft } from '@mlem-admin/types/nft';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetNfts = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, Nft[], QueryKeys.LIST_NFTS>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(QueryKeys.LIST_NFTS, () => getNfts(), {
    ...options,
  });
};
