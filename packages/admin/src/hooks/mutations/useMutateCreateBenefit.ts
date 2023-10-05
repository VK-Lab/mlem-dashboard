import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { createBenefit } from '@mlem-admin/services/admin/benefit';
import {
  CreateBenefitParams,
  CreateBenefitResponse,
} from '@mlem-admin/services/admin/benefit/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateCreateBenefit = (
  options?: UseMutationOptions<
    CreateBenefitResponse,
    unknown,
    CreateBenefitParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createBenefit,
    mutationKey: MutationKeys.CREATE_BENEFIT,
  });
};
