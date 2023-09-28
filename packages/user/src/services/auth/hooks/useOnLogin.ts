import { useAccount, useSignMessage } from "@casperdash/usewallet";
import { CookieKeys } from "@mlem-user/enums/cookieKeys";
import { Paths } from "@mlem-user/enums/paths";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { login } from "..";
import { LoginResponse } from "../types";

export const useOnLogin = () => {
  const router = useRouter();
  const { signMessageAsync, isLoading } = useSignMessage();
  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);

    router.push(Paths.HOME);
  };
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
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
