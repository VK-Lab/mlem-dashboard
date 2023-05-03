import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import {
  getBenefitCategories,
  GetBenefitCategoriesResponse,
} from '@/services/admin/benefit-category';

export const useGetAdminBenefitCategories = (
  options?: Omit<
    UseQueryOptions<
      GetBenefitCategoriesResponse,
      unknown,
      GetBenefitCategoriesResponse,
      [QueryKeys.BENEFIT_CATEGORIES]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.BENEFIT_CATEGORIES],
    () => getBenefitCategories(),
    {
      ...options,
    }
  );
};
