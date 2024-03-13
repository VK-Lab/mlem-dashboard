import React from "react";
import { useEffect } from "react";

import {Img} from '@mlem-admin/components/Img';
import {Text} from '@mlem-admin/components/Text';
import {Button} from '@mlem-admin/components/Button';
import Link from "next/link";
import {AdminPaths, PublicPaths} from '@mlem-admin/enums/paths.enum';

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

// old
import { ReactNode, useState, MouseEvent } from 'react';

import { useDisconnect } from '@casperdash/usewallet';
import { CookieKeys } from '@mlem-admin/enums/cookieKeys.enum';
import { logout } from '@mlem-admin/services/auth';
import {
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const settings = [
  {
    title: 'Logout',
    key: 'logout',
  },
];
export type Props = {
  children?: ReactNode;
  drawerWidth?: number;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [loggedUser, setLoggedUser] = useState({})

  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("loggedUser") || ""
    if (value) {
      value = JSON.parse(value)
      setLoggedUser(value)
    }
  }, [])

  const router = useRouter();
  const { disconnectAsync } = useDisconnect();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logoutMutation = useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onSuccess: async () => {
      await disconnectAsync();
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME, undefined, { shallow: true });
    },
  });

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSetting = (key: string) => {
    switch (key) {
      case 'logout':
        logoutMutation.mutate();
        break;
      default:
    }
  };

  return (
    <>
      <header className="bg-gray-900 flex items-center justify-between md:px-10 sm:px-5 px-[174px] py-3 w-full">
        <div className="flex md:flex-col flex-row gap-3 items-center justify-between w-full">
          <div className="flex flex-1 flex-row gap-3 items-center justify-start max-w-[660px] w-full">
            <div className="flex flex-col items-center justify-start w-auto">
              <Link href={AdminPaths.DASHBOARD}>
                <Img
                  className="h-[39px] md:h-auto object-cover w-[41px]"
                  src="/v2/images/img_logo1.png"
                  alt="logoOne"
                />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-start w-auto">
              <div className="flex flex-row items-start justify-start w-auto">
                <div className="flex flex-col h-11 md:h-auto items-center justify-center px-4 py-2 rounded w-auto">
                  <Text
                    className="text-base text-center text-white-A700 w-auto"
                    size="txtLexendSemiBold16WhiteA700"
                  >
                    <Link href={AdminPaths.CAMPAIGNS}>
                      Dashboard
                    </Link>
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row gap-3 items-center justify-end w-[430px] sm:w-full">
            <Button
              className="cursor-pointer flex items-center justify-center min-w-[192px]"
              leftIcon={
                <Img
                  className="h-6 mr-2"
                  src="/v2/images/img_lock.svg"
                  alt="lock"
                />
              }
              shape="round"
              color="amber_500"
              size="sm"
              variant="fill"
              type="button"
              onClick={() => router.push(AdminPaths.CREATE_CAMPAIGN_STEP_NFT_COLLECTION)}
            >
              <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
                Create Campaign
              </div>
            </Button>
            <div className="bg-indigo-500 flex flex-row gap-3 items-center justify-center px-4 py-2 rounded w-auto">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Img
                    className="h-8 md:h-auto rounded-[50%] w-8 mr-1"
                    src="/v2/images/img_yeve.png"
                    alt="yeve"
                  />
                  <Text
                    className="text-base text-center text-white-A700 w-auto"
                    size="txtBeVietnamProSemiBold16WhiteA700"
                  >
                    {loggedUser?.userId}
                  </Text>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ title, key }) => (
                  <MenuItem key={title} onClick={() => handleClickSetting(key)}>
                    <Typography sx={{ fontSize: 16 }} textAlign="center">
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-indigo-900 flex flex-col items-center justify-start w-full">
        <Img
          className="h-40 sm:h-auto object-cover w-full"
          src="/v2/images/banner_menu.png"
          alt="image"
        />
      </div>
    </>
  );
};

Header.defaultProps = {};

export default Header;
