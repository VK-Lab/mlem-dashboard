'use client';
import { useEffect, useCallback } from 'react';

import { useAccount } from '@casperdash/usewallet';
import { AdminPaths, PublicPaths } from '@mlem-admin/enums/paths.enum';
import { checkUser, setUserInfo } from '@mlem-admin/services/auth';
import { isAdmin } from '@mlem-admin/utils/permission';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouterGuard = ({ children }: { children: any }) => {
  const router = useRouter();
  const { publicKey, status, connector } = useAccount({
    onDisconnect: () => {
      console.log('onDisconnect');
      router.push({
        pathname: PublicPaths.HOME,
      });
    },
  });

  const isPublicPath = useCallback(
    (url: string) => {
      const publicPaths: string[] = Object.values(PublicPaths);
      const path = url.split('?')[0];
      return publicPaths.includes(path as string);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const authCheck = useCallback(
    async (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      if (isPublicPath(url)) {
        return;
      }

      const adminPaths: string[] = Object.values(AdminPaths);

      try {
        const user = await checkUser();

        setUserInfo(JSON.stringify(user));

        //custome
        //temporary open for testing user
        return;

        if (isAdmin(user)) {
          return;
        }

        const path = url.split('?')[0];
        if (!adminPaths.includes(path as string)) {
          return;
        }

        router.push({
          pathname: PublicPaths.HOME,
        });
      } catch (error) {
        router.push({
          pathname: PublicPaths.HOME,
        });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router]
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    authCheck(router.asPath);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, status]);

  useEffect(() => {
    if (!router.isReady || (!connector?.isReady && status === 'disconnected')) {
      return;
    }
    if (status === 'connecting') {
      return;
    }

    if ((!status || status === 'disconnected') && !publicKey) {
      if (isPublicPath(router.asPath)) {
        return;
      }

      router.push({
        pathname: PublicPaths.HOME,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, status, publicKey, connector?.isReady]);

  return children;
};

export default RouterGuard;
