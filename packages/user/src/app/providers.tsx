"use client";

import React from "react";
import { useState } from "react";

import {
  CasperDashConnector,
  CasperProvider,
  CasperSignerConnector,
  CasperWalletConnector,
  createClient,
} from "@casperdash/usewallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@mlem-user/components/theme-provider/theme-provider";
import { Toaster } from "@mlem-user/components/ui/toaster";
import BackgroundScript from "@mlem-user/modules/background-script";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  const [useWalletClient] = useState(() => {
    return createClient({
      connectors: [
        new CasperSignerConnector(),
        new CasperDashConnector(),
        new CasperWalletConnector(),
      ],
      autoConnect: false,
    });
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <CasperProvider client={useWalletClient}>
          {children}
          <BackgroundScript />
          <Toaster />
        </CasperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
