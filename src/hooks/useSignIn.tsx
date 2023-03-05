import { useState } from 'react';

import _get from 'lodash/get';
import { useMutation, UseMutationResult } from 'react-query';
import { SiweMessage } from 'siwe';

import { useI18nToast } from './useToast';
import { getNonce, login } from '@/services/auth';
import { LoginParams, LoginResponse } from '@/services/auth/types';

export type Props = {
  onLoginSuccess?: (data: LoginResponse) => void;
  defaultChainId: number;
};

const useAuthWallet = ({
  loginMutation,
}: {
  loginMutation: UseMutationResult<unknown, unknown, LoginParams, unknown>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toastError } = useI18nToast();

  const signIn = async (walletAddress: string, chainId: number) => {
    setIsLoading(true);
    const { nonce } = await getNonce();

    const message = new SiweMessage({
      domain: window.location.host,
      address: walletAddress,
      statement: 'Sign in with D2E to the app.',
      uri: window.location.origin,
      version: '1',
      chainId: chainId,
      nonce: nonce,
    });

    try {
      const result = await loginMutation.mutateAsync({
        message,
        signature: '',
        address: walletAddress,
      });

      return result;
    } catch (err) {
      toastError(_get(err, 'code', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isSigning: isLoading,
  };
};

const useSignIn = ({ onLoginSuccess }: Props) => {
  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: 'login',
    onSuccess: (data) => {
      onLoginSuccess?.(data);
    },
  });

  const { signIn, isSigning } = useAuthWallet({
    loginMutation,
  });

  const handleSignIn = async (walletAddress?: string, chainId?: number) => {
    if (!walletAddress || !chainId) {
      return;
    }
    await signIn(walletAddress, chainId);
  };

  return {
    handleSignIn,
    isSigning,
  };
};

export default useSignIn;
