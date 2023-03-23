import { useState } from 'react';

import {
  CasperDashConnector,
  CasperProvider,
  CasperSignerConnector,
  createClient,
} from '@casperdash/usewallet';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import RouterGuard from '@/hocs/RouterGuard';
import 'react-toastify/dist/ReactToastify.css';
import Web3AuthContainer from '@/modules/AuthContainer';
import store from '@/store';
import theme from '@/theme';

import '@/assets/styles.css';

const client = createClient({
  connectors: [new CasperSignerConnector(), new CasperDashConnector()],
  autoConnect: true,
});

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

  return (
    <>
      <Head>
        <title>Melem Dashboard</title>
        <link rel="shortcut icon" href="/img/chakra-logo.png" />
        <link rel="apple-touch-icon" href="/img/chakra-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Melem Dashboard" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <CasperProvider client={client}>
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
            <Web3AuthContainer />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
