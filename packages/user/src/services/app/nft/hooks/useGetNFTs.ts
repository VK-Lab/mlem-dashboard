import { useAccount } from "@casperdash/usewallet";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { NFT } from "@mlem-user/types/nft";

import { getNfts } from "..";

export const useGetNFTs = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      NFT[],
      [QueryKeys.LIST_NFTS, string | undefined | null]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { publicKey } = useAccount();
  return useQuery([QueryKeys.LIST_NFTS, publicKey], () => getNfts(), {
    ...options,
    enabled: !!publicKey,
  });
};
