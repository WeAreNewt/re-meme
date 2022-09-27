import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import PageLayout from '../components/Layout';
import wagmiClient, { chains } from '../lib/config/wagmi';
import apolloClient from '../lib/config/apollo';
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/main.css'
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from '../lib/redux/store';

function MyApp({ Component, ...rest }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Head><title>re:meme</title></Head>
        <WagmiProvider client={wagmiClient}>
          <RainbowKitProvider coolMode chains={chains}>
              <PageLayout>
                <Component {...props.pageProps} />
              </PageLayout>
          </RainbowKitProvider>
        </WagmiProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
