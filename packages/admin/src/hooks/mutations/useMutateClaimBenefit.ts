import { MutationKeys } from '@mlem/admin/enums/mutationKeys.enum';
import { claimNftBenefit } from '@mlem/admin/services/nft';
import {
  ClaimNftBenefitParams,
  ClaimNftBenefitResponse,
} from '@mlem/admin/services/nft/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateClaimBenefit = (
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
    mutationKey: MutationKeys.CLAIM_NFT_BENEFIT,
  });
};
