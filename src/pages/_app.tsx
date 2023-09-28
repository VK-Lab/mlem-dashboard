import { useState } from 'react';

import {
  CasperDashConnector,
  CasperProvider,
  CasperSignerConnector,
  CasperWalletConnector,
  createClient,
} from '@casperdash/usewallet';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import RouterGuard from '@/hocs/RouterGuard';
import store from '@/store';
import theme from '@/theme';

import 'react-toastify/dist/ReactToastify.css';

import '@/assets/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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
    <>
      <Head>
        <title>Melem Dashboard</title>
        <link rel="shortcut icon" href="/img/logo.png" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Melem Dashboard" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <NextNProgress />

            <CasperProvider client={useWalletClient}>
              <RouterGuard>
                <Component {...pageProps} />
              </RouterGuard>
            </CasperProvider>
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
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
