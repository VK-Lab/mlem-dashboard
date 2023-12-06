import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { QueryKeys } from "@mlem-user/enums/queryKeys";

import { checkNftIsLuckyBox } from "..";

type Props = {
  contractPackageHash: string;
  tokenId: string;
};

export const useCheckNFTIsLuckyBox = (
  { contractPackageHash, tokenId }: Props,
  options?: Omit<
    UseQueryOptions<boolean, unknown, boolean, Array<string>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(
    [QueryKeys.NFT, contractPackageHash, tokenId, "lucky-box"],
    async () => {
      const { isLuckyBox } = await checkNftIsLuckyBox(
        contractPackageHash,
        tokenId
      );

      return isLuckyBox;
    },
    {
      ...options,
    }
  );
};
