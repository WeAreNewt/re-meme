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

const client = new ApolloClient({
  uri: 'https://api.lens.dev/',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) { //: AppProps
  return (
    <ApolloProvider client={client}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <Component {...pageProps} />
          </RainbowKitProvider>
      </WagmiProvider>
    </ApolloProvider>
  )
}

export default MyApp
