"use client";
import React from "react";

import { useAccount } from "@casperdash/usewallet";
import LogoImg from "@mlem-user/assets/images/logo.png";
import { useOnLogin } from "@mlem-user/services/app/auth/hooks/useOnLogin";
import Image from "next/image";
import Link from "next/link";

import { ButtonConnect } from "./components/button-connect";
import { MainNav } from "./components/main-nav";
import { UserNav } from "./components/user-nav";
import { ModeToggle } from "../../core/mode-toggle";

export const UserHeader = () => {
  const { publicKey } = useAccount();
  useOnLogin();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <Link href="/">
            <Image
              className="dark:invert"
              src={LogoImg}
              alt="Logo"
              width={80}
              height={20}
              priority
            />
          </Link>
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {publicKey ? <UserNav /> : <ButtonConnect />}
        </div>
      </div>
    </div>
  );
};
