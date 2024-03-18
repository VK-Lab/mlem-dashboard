import { useCallback } from 'react';

import { useSignMessage } from '@casperdash/usewallet';
import { LoginTypeEnum } from '@mlem-admin/enums';
import { CookieKeys } from '@mlem-admin/enums/cookieKeys.enum';
import { AdminPaths } from '@mlem-admin/enums/paths.enum';
import { login } from '@mlem-admin/services/auth';
import { LoginResponse } from '@mlem-admin/services/auth/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export type UseOnLoginProps = {
  loginType: LoginTypeEnum;
};

export const useOnLogin = () => {
  const router = useRouter();
  const { signMessageAsync, isLoading } = useSignMessage();
  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);

    router.push(AdminPaths.DASHBOARD);
  };
  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: 'login',
    onSuccess: (data) => {
      onLoginSuccess?.(data);
    },
  });

  const handleOnConnect = useCallback(
    async (publicKey: string) => {
      if (isLoading) {
        return;
      }
      const signature = await signMessageAsync({
        signingPublicKeyHex: publicKey,
        message: `mlem-${publicKey}`,
      });

      if (!signature) {
        return;
      }

      await loginMutation.mutateAsync({
        signature,
        message: `mlem-${publicKey}`,
        address: publicKey,
      });
    },
    [isLoading, loginMutation, signMessageAsync]
  );

  return { handleOnConnect };
};
