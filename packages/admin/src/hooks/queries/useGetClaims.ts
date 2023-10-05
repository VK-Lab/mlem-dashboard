import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getClaims } from '@mlem-admin/services/admin/claim';
import { GetClaimsResponse } from '@mlem-admin/services/admin/claim/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetClaims = (
  options?: Omit<
    UseQueryOptions<
      GetClaimsResponse,
      unknown,
      GetClaimsResponse,
      QueryKeys.CLAIMS
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(QueryKeys.CLAIMS, () => getClaims(), {
    ...options,
  });
};
