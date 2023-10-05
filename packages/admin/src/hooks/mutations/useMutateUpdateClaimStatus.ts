import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { updateClaimStatus } from '@mlem-admin/services/admin/claim';
import {
  UpdateClaimParams,
  UpdateClaimStatusResponse,
} from '@mlem-admin/services/admin/claim/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateUpdateClaimStatus = (
  options?: UseMutationOptions<
    UpdateClaimStatusResponse,
    unknown,
    UpdateClaimParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateClaimStatus,
    mutationKey: MutationKeys.UPDATE_CLAIM_STATUS,
  });
};
