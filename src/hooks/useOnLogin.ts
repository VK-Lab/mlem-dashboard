import { useAccount, useSignMessage } from '@casperdash/usewallet';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { LoginTypeEnum } from '@/enums';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { AdminPaths, PrivatePaths } from '@/enums/paths.enum';
import { login } from '@/services/auth';
import { LoginResponse } from '@/services/auth/types';

export type UseOnLoginProps = {
  loginType: LoginTypeEnum;
};

export const useOnLogin = ({ loginType }: UseOnLoginProps) => {
  const router = useRouter();
  const { signMessageAsync, isLoading } = useSignMessage();
  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);

    if (loginType === LoginTypeEnum.ADMIN) {
      router.push(AdminPaths.CAMPAIGNS);
    } else {
      router.push(PrivatePaths.USER_COLLECTION);
    }
  };
  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: 'login',
    onSuccess: (data) => {
      onLoginSuccess?.(data);
    },
  });

  useAccount({
    onConnect: async ({ publicKey: publicKeyOnConnect }) => {
      if (isLoading) {
        return;
      }
      const signature = await signMessageAsync({
        signingPublicKeyHex: publicKeyOnConnect,
        message: `mlem-${publicKeyOnConnect}`,
      });

      if (!signature) {
        return;
      }

      await loginMutation.mutateAsync({
        signature,
        message: `mlem-${publicKeyOnConnect}`,
        address: publicKeyOnConnect,
      });
    },
  });
};
