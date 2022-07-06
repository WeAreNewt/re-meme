import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'
import { chain, createClient, WagmiProvider } from 'wagmi';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import 'bootstrap/dist/css/bootstrap.min.css';

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Memixer',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';

const client = new ApolloClient({
  uri: 'https://api-mumbai.lens.dev',
  cache: new InMemoryCache({
    addTypename: false
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate> 
          </Provider>
        </RainbowKitProvider>
      </WagmiProvider>
    </ApolloProvider>
  )
}

export default MyApp
