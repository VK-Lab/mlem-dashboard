import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import {
  createBenefitCategory,
  CreateBenefitCategoryParams,
  CreateBenefitCategoryResponse,
} from '@/services/admin/benefit-category';

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
