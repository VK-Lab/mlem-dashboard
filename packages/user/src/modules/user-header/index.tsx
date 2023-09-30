'use client';
import React from 'react';

import { PathsEnum } from '@mlem-user/enums/path';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MainNav } from './main-nav';
import Link from 'next/link';
import { UserNav } from './user-nav';

export const UserHeader = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(PathsEnum.AUTH);
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <Link href="/">
            <Image
              className="dark:invert"
              src="/logo.png"
              alt="Logo"
              width={80}
              height={20}
              priority
            />
          </Link>
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <Button onClick={handleOnClick}>Connect Wallet</Button> */}
          <UserNav />
        </div>
      </div>
    </div>
  );
};
