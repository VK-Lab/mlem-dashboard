import { checkUser } from '@mlem-admin/services/auth';
import { CheckUserResponse } from '@mlem-admin/services/auth/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateCheckUser = (
  options?: UseMutationOptions<CheckUserResponse, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: checkUser,
    mutationKey: 'checkUser',
    ...options,
  });
};
