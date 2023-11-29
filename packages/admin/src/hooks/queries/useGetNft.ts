import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getNft } from '@mlem-admin/services/nft';
import { Nft } from '@mlem-admin/types/nft';
import { useQuery, UseQueryOptions } from 'react-query';

type Props = {
  contractPackageHash: string;
  tokenId: string;
};

export const useGetNft = (
  { contractPackageHash, tokenId }: Props,
  options: Omit<
    UseQueryOptions<Nft, Error, Nft, Array<string>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.NFT, contractPackageHash, tokenId],
    () => getNft(contractPackageHash, tokenId),
    {
      ...options,
    }
  );
};
