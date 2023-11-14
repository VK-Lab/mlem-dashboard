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
import { ThemeProvider } from "@mlem-user/components/theme-provider/theme-provider";
import { Toaster } from "@mlem-user/components/ui/toaster";
import BackgroundTransactions from "@mlem-user/modules/background-script";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <BackgroundTransactions />
          <Toaster />
        </CasperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
