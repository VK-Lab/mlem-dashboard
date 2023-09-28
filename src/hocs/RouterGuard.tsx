import { useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import { AdminPaths, PublicPaths } from '@/enums/paths.enum';
import { checkUser } from '@/services/auth';
import { User } from '@/types/user';
import { isAdmin } from '@/utils/permission';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouterGuard = ({ children }: { children: any }) => {
  const router = useRouter();

  const authCheck = useCallback(
    (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      const publicPaths: string[] = Object.values(PublicPaths);
      const path = url.split('?')[0];
      if (publicPaths.includes(path)) {
        return;
      }

      const adminPaths: string[] = Object.values(AdminPaths);

      checkUser()
        .then((user: User) => {
          if (isAdmin(user)) {
            return;
          }

          if (!adminPaths.includes(path)) {
            return;
          }

          router.push({
            pathname: PublicPaths.HOME,
          });
        })
        .catch(() => {
          router.push({
            pathname: PublicPaths.HOME,
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router]
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // on initial load - run auth check
    authCheck(router.asPath);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return children;
};

export default RouterGuard;
