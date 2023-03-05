import React, { useEffect } from 'react';

import {
  useConnect,
  CasperDashConnector,
  useAccount,
} from '@casperdash/usewallet';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { StyledButton } from './styled';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { PrivatePaths } from '@/enums/paths.enum';
import { login } from '@/services/auth';
import { LoginResponse } from '@/services/auth/types';

const ConnectorButtonMenu = () => {
  const router = useRouter();
  const { publicKey } = useAccount();

  const loginMutation = useMutation({
    mutationFn: () => login({ address: publicKey }),
    mutationKey: ['login', publicKey],
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

    loginMutation.mutate();
  }, [loginMutation, publicKey]);

  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);
    router.push(PrivatePaths.USER_COLLECTION);
  };

  const { connectAsync, isLoading } = useConnect({
    connector: new CasperDashConnector(),
  });

  const handleConnect = async () => {
    await connectAsync();
  };

  return (
    <Box>
      <StyledButton
        fullWidth
        variant="contained"
        onClick={() => handleConnect()}
        loading={isLoading}
      >
        Connect To Your Wallet
      </StyledButton>
    </Box>
  );
};

export default ConnectorButtonMenu;
