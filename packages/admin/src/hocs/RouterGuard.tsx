import { useEffect, useCallback } from 'react';

import { AdminPaths, PublicPaths } from '@mlem/admin/enums/paths.enum';
import { checkUser } from '@mlem/admin/services/auth';
import { User } from '@mlem/admin/types/user';
import { isAdmin } from '@mlem/admin/utils/permission';
import { useRouter } from 'next/router';

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
