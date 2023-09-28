import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { getTiers } from '@mlem/admin/services/admin/tier';
import {
  GetTiersParams,
  GetTiersResponse,
} from '@mlem/admin/services/admin/tier/types';
import { useQuery, UseQueryOptions } from 'react-query';

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
