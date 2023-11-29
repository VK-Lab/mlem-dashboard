"use client";

import { useAccount, useDisconnect } from "@casperdash/usewallet";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";
import { MiddleTruncatedText } from "@mlem-user/components/truncated-text";
import { Avatar } from "@mlem-user/components/ui/avatar";
import { Button } from "@mlem-user/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mlem-user/components/ui/dropdown-menu";
import { CookieKeys } from "@mlem-user/enums/cookieKeys";
import { Paths } from "@mlem-user/enums/paths";

export const UserNav = () => {
  const router = useRouter();
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(Paths.HOME);
    },
  });

  const handleOnLogout = () => {
    disconnect();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <GradientAvatar name={publicKey ?? ""} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              <MiddleTruncatedText>{publicKey ?? ""}</MiddleTruncatedText>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOnLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
