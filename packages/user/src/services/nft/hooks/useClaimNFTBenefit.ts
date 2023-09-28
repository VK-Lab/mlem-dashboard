import { MutationKeys } from "@mlem-user/enums/mutationKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { claimNftBenefit } from "..";
import { ClaimNftBenefitParams, ClaimNftBenefitResponse } from "../types";

export const useClaimNFTBenefit = (
  options?: UseMutationOptions<
    ClaimNftBenefitResponse,
    unknown,
    ClaimNftBenefitParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: claimNftBenefit,
    mutationKey: [MutationKeys.CLAIM_NFT_BENEFIT],
  });
};
