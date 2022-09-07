import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import PageLayout from '../components/Layout';
import wagmiClient, { chains } from '../config/wagmi';
import apolloClient from '../config/apollo';

import '../styles/globals.css'
import '../styles/main.css'
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </PersistGate> 
          </Provider>
        </RainbowKitProvider>
      </WagmiProvider>
    </ApolloProvider>
  )
}

export default MyApp
