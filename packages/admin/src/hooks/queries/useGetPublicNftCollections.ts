import { MintingMode } from '@mlem-admin/contracts/cep78';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNftCollections } from '@mlem-admin/services/admin/nft-collection';
import {
  GetNftCollectionsParams,
  GetNftCollectionsResponse,
} from '@mlem-admin/services/admin/nft-collection/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetPublicNftCollections = (
  query: Partial<GetNftCollectionsParams> = {},
  options: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetNftCollectionsResponse,
      [
        QueryKeys.NFT_COLLECTIONS,
        {
          mintingMode: MintingMode.Public;
        }
      ]
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(
    [
      QueryKeys.NFT_COLLECTIONS,
      {
        mintingMode: MintingMode.Public,
      },
    ],
    () =>
      getNftCollections({
        ...query,
        mintingMode: MintingMode.Public,
      }),
    {
      ...options,
      refetchOnWindowFocus: true,
    }
  );
};
