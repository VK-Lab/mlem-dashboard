import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNftCollections } from '@mlem-admin/services/admin/nft-collection';
import {
  GetNftCollectionsParams,
  GetNftCollectionsResponse,
} from '@mlem-admin/services/admin/nft-collection/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetAllNftCollections = (
  query: Partial<GetNftCollectionsParams> = {},
  options: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetNftCollectionsResponse,
      QueryKeys.NFT_COLLECTIONS
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(QueryKeys.NFT_COLLECTIONS, () => getNftCollections(query), {
    ...options,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 1000,
  });
};
