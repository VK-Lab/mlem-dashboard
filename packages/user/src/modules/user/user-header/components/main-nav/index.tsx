import React from "react";

import { useAccount } from "@casperdash/usewallet";
import BlueHeartSvg from "@mlem-user/assets/svgs/blue-heart.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@mlem-user/components/ui/sheet";
import { Config } from "@mlem-user/config";
import { cn } from "@mlem-user/lib/utils";
import ButtonLogout from "@mlem-user/modules/core/button-logout";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { UserNav } from "./user-nav";
import { ButtonConnect } from "../../../../core/button-connect";

const navLinkClassName =
  "text-lg md:text-sm font-medium transition-colors hover:text-primary text text-start";

const NavLinks = () => {
  const { publicKey } = useAccount();
  return (
    <>
      <Link href="/" className={navLinkClassName}>
        Home
      </Link>
      <Link href="/explore" className={navLinkClassName}>
        Explore
      </Link>
      {!!publicKey && (
        <Link href="/my-nfts" className={navLinkClassName}>
          My NFTs
        </Link>
      )}
      <Link
        href={Config.campaignerUrl}
        target="_blank"
        className={navLinkClassName}
      >
        <div>
          Become a Campaigner
          <Image
            src={BlueHeartSvg}
            alt="Blue Heart"
            className="inline-block w-4 h-4 ml-1"
          />
        </div>
      </Link>
    </>
  );
};

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const { publicKey } = useAccount();

  return (
    <>
      <nav className={cn(className)} {...props}>
        <div className="hidden justify-end md:flex items-center space-x-4 lg:space-x-6">
          <NavLinks />
        </div>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        {/* <ModeToggle /> */}
        <div className="flex w-[75px] justify-end md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-full h-full" side={"top"}>
              <SheetHeader className="h-full">
                <SheetDescription className="h-full w-full">
                  <div className="mt-8 flex flex-col justify-between h-full">
                    <div className="flex flex-col space-y-4 flex-1">
                      <NavLinks />
                    </div>
                    {publicKey ? (
                      <ButtonLogout className="w-full mb-8" />
                    ) : (
                      <ButtonConnect className="w-full mb-8" />
                    )}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex">
          {publicKey ? <UserNav /> : <ButtonConnect />}
        </div>
      </div>
    </>
  );
};
