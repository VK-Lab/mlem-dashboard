import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";

import { getTotalNFTs } from "..";

export const useGetTotalNFTs = (
  contractAddress: string,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      number,
      [QueryKeys.NFT_COLLECTIONS, string | undefined | null, "total"]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [QueryKeys.NFT_COLLECTIONS, contractAddress, "total"],
    async () => {
      const { total } = await getTotalNFTs(contractAddress);

      return total;
    },
    {
      ...options,
      enabled: !!contractAddress,
    }
  );
};
