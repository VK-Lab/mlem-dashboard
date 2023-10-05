import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNft } from '@mlem-admin/services/nft';
import { Nft } from '@mlem-admin/types/nft';
import { useQuery, UseQueryOptions } from 'react-query';

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export const useGetNft = (
  { tokenAddress, tokenId }: Props,
  options: Omit<
    UseQueryOptions<unknown, unknown, Nft, Array<string>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.NFT, tokenAddress, tokenId],
    () => getNft(tokenAddress, tokenId),
    {
      ...options,
    }
  );
};
