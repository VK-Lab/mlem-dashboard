import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDisconnect } from '@casperdash/usewallet';
import { Button } from '@mlem-admin/components/Button';
import { Img } from '@mlem-admin/components/Img';
import { Text } from '@mlem-admin/components/Text';
import { CookieKeys } from '@mlem-admin/enums/cookieKeys.enum';
import { AdminPaths, PublicPaths } from '@mlem-admin/enums/paths.enum';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { logout } from '@mlem-admin/services/auth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const Header = (props) => {
  const { toastSuccess, toastError } = useI18nToast();
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem('loggedUser') || '';
    if (value) {
      value = JSON.parse(value);
      setLoggedUser(value);
    }
  }, []);
  const router = useRouter();
  const { disconnectAsync } = useDisconnect();
  const logoutMutation = useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onSuccess: async () => {
      await disconnectAsync();
      toastSuccess('logout_ok');
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME, undefined, { shallow: true });
    },
  });

  const [open, setOpen] = useState(false);
  const [openMobi, setOpenMobi] = useState(false);

  return (
    <>
      <header className="bg-gray-900 flex flex-col items-center justify-between md:px-10 sm:px-5 px-[174px] py-3 w-full">
        <div className="flex flex-row gap-3 items-center justify-between w-full">
          <div className="flex flex-1 flex-row gap-3 w-full md:w-auto">
            <div className="flex flex-col items-center justify-start w-auto">
              <Link href={AdminPaths.DASHBOARD}>
                <Img
                  className="h-[39px] object-cover w-[41px]"
                  src="/v2/images/img_logo1.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-start w-auto md:hidden">
              <div className="flex flex-row items-start justify-start w-auto">
                <div className="flex flex-col h-11 items-center justify-center px-4 py-2 rounded w-auto">
                  <Text
                    className="text-base text-center text-white-A700 w-auto"
                    size="txtLexendSemiBold16WhiteA700"
                  >
                    <Link href={AdminPaths.CAMPAIGNS}>Dashboard</Link>
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row gap-3 items-center justify-end md:hidden">
            <Button
              className="cursor-pointer flex items-center justify-center"
              leftIcon={
                <Img
                  className="h-6 mr-2"
                  src="/v2/images/img_lock.svg"
                  alt="campaign_create"
                />
              }
              shape="round"
              color="amber_500"
              size="sm"
              variant="fill"
              type="button"
              onClick={() =>
                router.push(AdminPaths.CREATE_CAMPAIGN_STEP_NFT_COLLECTION)
              }
            >
              <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
                Create Campaign
              </div>
            </Button>

            <div className="relative">
              <Button
                className="cursor-pointer flex items-center justify-center bg-indigo-500"
                leftIcon={
                  <Img
                    className="h-6 mr-2"
                    src="/v2/images/img_yeve.png"
                    alt="user"
                  />
                }
                shape="round"
                size="sm"
                variant="fill"
                type="button"
                onClick={() => setOpen((prev) => !prev)}
              >
                <div className="!text-white-A700 font-lexend font-semibold text-base text-center">
                  {loggedUser?.userId}
                </div>
              </Button>
              <div
                className={`absolute right-0 top-13 bg-gray-300 rounded w-auto ${
                  open
                    ? 'opacity-100 h-auto'
                    : 'opacity-0 h-0 transition-all duration-200'
                }`}
              >
                <div
                  className="cursor-pointer px-8 py-3"
                  onClick={() => logoutMutation.mutate()}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-end justify-end relative hidden md:block">
            <Img
              className="w-[40px] cursor-pointer relative -right-2"
              src="/v2/images/m_header_profile.png"
              alt="menu_header"
              onClick={() => setOpenMobi((prev) => !prev)}
            />
            <div
              className={`absolute right-0 top-13 bg-gray-300 items-center rounded w-auto ${
                openMobi
                  ? 'opacity-100 h-auto'
                  : 'opacity-0 h-0 transition-all duration-200'
              }`}
            >
              <div
                className="cursor-pointer px-1 py-2 text-right w-[150px] border-b-1 border-b-gray-600"
                onClick={() =>
                  router.push(AdminPaths.CREATE_CAMPAIGN_STEP_NFT_COLLECTION)
                }
              >
                Create Campaign
              </div>
              <div
                className="cursor-pointer px-1 py-2 text-right"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-indigo-900 flex flex-col items-center justify-start w-full">
        <Img
          className="h-40 sm:h-auto object-cover w-full md:hidden"
          src="/v2/images/banner_menu.png"
          alt="image"
        />
        <Img
          className="h-40 sm:h-auto object-cover w-full hidden md:block"
          src="/v2/images/m_banner_menu.png"
          alt="image"
        />
      </div>
    </>
  );
};

export default Header;
