import { useAccount, useSignMessage } from "@casperdash/usewallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { CookieKeys } from "@mlem-user/enums/cookieKeys";
import { QueryKeys } from "@mlem-user/enums/queryKeys";

import { login } from "..";
import { LoginResponse } from "../types";

export const useOnLogin = () => {
  const queryClient = useQueryClient();
  const { signMessageAsync, isLoading } = useSignMessage();
  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);
  };
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async (data) => {
      onLoginSuccess?.(data);
      await queryClient.invalidateQueries([QueryKeys.LIST_NFTS]);
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
