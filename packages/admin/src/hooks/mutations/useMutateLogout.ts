import { CookieKeys } from '@mlem/admin/enums/cookieKeys.enum';
import { PublicPaths } from '@mlem/admin/enums/paths.enum';
import { logout } from '@mlem/admin/services/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export const useMutateLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onMutate: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME);
    },
  });
};
