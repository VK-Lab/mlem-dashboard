import { UserHeader } from "@mlem-user/modules/user-header";
import { cn } from "@mlem-user/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { Providers } from "./providers";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MELEM",
  description: "Next generation of brand NFT programs powered by Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark:bg-white ")}>
        <NextTopLoader showSpinner={false} />
        <Providers>
          <UserHeader />
          <div className="mx-auto text-foreground text-gray-900 antialiased">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
