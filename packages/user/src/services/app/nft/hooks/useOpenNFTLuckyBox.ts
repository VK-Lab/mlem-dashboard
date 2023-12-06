import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { MutationKeys } from "@mlem-user/enums/mutationKeys";

import { openLuckyBox } from "..";

type Params = {
  contractPackageHash: string;
  tokenId: string;
};

export const useOpenNFTLuckyBox = (
  options?: UseMutationOptions<boolean, unknown, Params, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      const data = await openLuckyBox(
        params.contractPackageHash,
        params.tokenId
      );

      return data.isSuccess;
    },
    mutationKey: [MutationKeys.CLAIM_NFT_BENEFIT],
  });
};
