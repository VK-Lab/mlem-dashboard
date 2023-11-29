import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { NFT } from "@mlem-user/types/nft";

import { getNft } from "..";

type Props = {
  contractPackageHash: string;
  tokenId: string;
};

export const useGetNFT = (
  { contractPackageHash, tokenId }: Props,
  options?: Omit<
    UseQueryOptions<unknown, unknown, NFT, Array<string>>,
    "queryKey" | "queryFn"
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
