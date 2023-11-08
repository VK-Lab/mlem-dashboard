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
      autoConnect: true,
    });
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <CasperProvider client={useWalletClient}>
          {children}
          <BackgroundTransactions />
        </CasperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
