import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getTiers } from '@/services/admin/tier';
import { GetTiersParams, GetTiersResponse } from '@/services/admin/tier/types';

export const useGetTiers = (
  params: GetTiersParams = {},
  options: Omit<
    UseQueryOptions<unknown, unknown, GetTiersResponse, [QueryKeys.TIERS]>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery([QueryKeys.TIERS], () => getTiers(params), {
    ...options,
    refetchOnWindowFocus: true,
  });
};
