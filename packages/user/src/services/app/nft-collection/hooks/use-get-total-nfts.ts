import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { getTotalNFTs } from "@mlem-user/services/app/nft-collection";

export const useGetTotalNFTs = (
  contractPackageHash?: string,
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
    [QueryKeys.NFT_COLLECTIONS, contractPackageHash, "total"],
    async () => {
      if (!contractPackageHash) {
        return 0;
      }
      const { total } = await getTotalNFTs(contractPackageHash);

      return Math.min(total, 99);
    },
    {
      ...options,
      enabled: !!contractPackageHash,
    }
  );
};
