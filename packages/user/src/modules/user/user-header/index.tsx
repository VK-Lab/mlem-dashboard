"use client";
import React from "react";

import LogoImg from "@mlem-user/assets/images/logo.png";
import { useOnLogin } from "@mlem-user/services/app/auth/hooks/useOnLogin";
import Image from "next/image";
import Link from "next/link";

import { MainNav } from "./components/main-nav";

export const UserHeader = () => {
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
      </div>
    </div>
  );
};
