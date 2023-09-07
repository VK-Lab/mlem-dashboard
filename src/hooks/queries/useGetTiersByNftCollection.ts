import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getTiersByNftCollection } from '@/services/admin/nft-collection';
import {
  GetTiersByNftCollectionParams,
  GetTiersByNftCollectionResponse,
} from '@/services/admin/nft-collection/types';

export const useGetTiersByNftCollection = (
  query: Partial<GetTiersByNftCollectionParams> &
    Pick<GetTiersByNftCollectionParams, 'nftCollectionId'>,
  options: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetTiersByNftCollectionResponse,
      [QueryKeys.NFT_COLLECTIONS, string | undefined, QueryKeys.TIERS]
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(
    [QueryKeys.NFT_COLLECTIONS, query.nftCollectionId, QueryKeys.TIERS],
    () => getTiersByNftCollection(query),
    {
      ...options,
      refetchOnWindowFocus: true,
      enabled: !!query.nftCollectionId,
    }
  );
};
