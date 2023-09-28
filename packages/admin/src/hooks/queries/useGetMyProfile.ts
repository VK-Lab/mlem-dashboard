import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { getMyProfile } from '@mlem/admin/services/user';
import { GetMyProfileResponse } from '@mlem/admin/services/user/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetMyProfile = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetMyProfileResponse,
      [QueryKeys.MY_PROFILE]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.MY_PROFILE], () => getMyProfile(), {
    ...options,
  });
};
