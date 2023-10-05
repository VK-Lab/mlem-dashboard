import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import {
  createBenefitCategory,
  CreateBenefitCategoryParams,
  CreateBenefitCategoryResponse,
} from '@mlem-admin/services/admin/benefit-category';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateCreateBenefitCategory = (
  options?: UseMutationOptions<
    CreateBenefitCategoryResponse,
    unknown,
    CreateBenefitCategoryParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createBenefitCategory,
    mutationKey: MutationKeys.CREATE_BENEFIT_CATEGORY,
  });
};
