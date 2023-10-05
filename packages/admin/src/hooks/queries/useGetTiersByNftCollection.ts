import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getTiersByNftCollection } from '@mlem-admin/services/admin/nft-collection';
import {
  GetTiersByNftCollectionParams,
  GetTiersByNftCollectionResponse,
} from '@mlem-admin/services/admin/nft-collection/types';
import { useQuery, UseQueryOptions } from 'react-query';

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
