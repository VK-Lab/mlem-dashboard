import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { getBenefits } from '@mlem/admin/services/admin/benefit';
import {
  GetBenefitsParams,
  GetBenefitsResponse,
} from '@mlem/admin/services/admin/benefit/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetBenefits = (
  params?: GetBenefitsParams,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetBenefitsResponse,
      [QueryKeys.BENEFITS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.BENEFITS], () => getBenefits(params), {
    ...options,
  });
};
