import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { NFT } from "@mlem-user/types/nft";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getNft } from "..";

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export const useGetNFT = (
  { tokenAddress, tokenId }: Props,
  options?: Omit<
    UseQueryOptions<unknown, unknown, NFT, Array<string>>,
    "queryKey" | "queryFn"
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
