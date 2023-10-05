import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import {
  getBenefitCategories,
  GetBenefitCategoriesResponse,
} from '@mlem-admin/services/admin/benefit-category';
import { useQuery, UseQueryOptions } from 'react-query';

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
