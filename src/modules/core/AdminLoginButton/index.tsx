import React, { useEffect, useRef } from 'react';

import {
  CasperDashConnector,
  useAccount,
  useConnect,
  useSignMessage,
} from '@casperdash/usewallet';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { StyledButton } from './styled';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { AdminPaths } from '@/enums/paths.enum';
import { login } from '@/services/auth';
import { LoginResponse } from '@/services/auth/types';

const AdminLoginButton = () => {
  const router = useRouter();
  const { publicKey } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const ref = useRef<string | null>(null);

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

  useEffect(() => {
    if (!publicKey) {
      return;
    }
    if (loginMutation.isLoading) {
      return;
    }
    if (ref.current) {
      return;
    }
    (ref as React.MutableRefObject<string>).current = publicKey;

    const signIn = async () => {
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
    };

    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const { connectAsync } = useConnect({
    connector: new CasperDashConnector(),
  });

  const handleConnect = async () => {
    await connectAsync();
  };

  return (
    <Box>
      <StyledButton variant="contained" onClick={() => handleConnect()}>
        Connect To Admin Wallet
      </StyledButton>
    </Box>
  );
};

export default AdminLoginButton;
