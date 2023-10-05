import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { checkPhoneVerfied } from '@mlem-admin/services/auth';
import { CheckPhoneVerfiedResponse } from '@mlem-admin/services/auth/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useCheckPhoneVerfied = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      CheckPhoneVerfiedResponse,
      [QueryKeys.CHECK_PHONE_VERFIED]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.CHECK_PHONE_VERFIED], () => checkPhoneVerfied(), {
    ...options,
  });
};
