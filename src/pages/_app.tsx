import { useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

import RouterGuard from '@/hocs/RouterGuard';
import 'react-toastify/dist/ReactToastify.css';
import Web3AuthContainer from '@/modules/AuthContainer';
import store from '@/store';
import theme from '@/theme';

import '@/assets/styles.css';

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [new MetaMaskConnector({ chains })],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>MLEM Dashboard</title>
        <link rel="shortcut icon" href="/img/chakra-logo.png" />
        <link rel="apple-touch-icon" href="/img/chakra-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="MLEM Dashboard" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <WagmiConfig client={client}>
              <RouterGuard>
                <Component {...pageProps} />
              </RouterGuard>
            </WagmiConfig>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Web3AuthContainer />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
