import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getBenefits } from '@/services/admin/benefit';
import {
  GetBenefitsParams,
  GetBenefitsResponse,
} from '@/services/admin/benefit/types';

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
