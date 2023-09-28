import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { NFT } from "@mlem-user/types/nft";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getNfts } from "..";

export const useGetNFTs = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, NFT[], [QueryKeys.LIST_NFTS]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery([QueryKeys.LIST_NFTS], () => getNfts(), {
    ...options,
  });
};
