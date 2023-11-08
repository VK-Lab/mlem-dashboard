import { useState } from 'react';

import {
  CasperDashConnector,
  CasperProvider,
  CasperSignerConnector,
  CasperWalletConnector,
  createClient,
} from '@casperdash/usewallet';
import { ThemeProvider } from '@emotion/react';
import RouterGuard from '@mlem-admin/hocs/RouterGuard';
import store from '@mlem-admin/store';
import theme from '@mlem-admin/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '@mlem-admin/assets/styles.css';

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
