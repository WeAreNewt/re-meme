import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, DisclaimerComponent } from '@rainbow-me/rainbowkit';
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import PageLayout from '../components/Layout';
import wagmiClient, { chains } from '../config/wagmi';
import apolloClient from '../config/apollo';
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/main.css'
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://rememe.lol/terms-of-service">Terms of Service</Link> and
    acknowledge you have read and understand the app{' '}
    <Link href="https://rememe.lol/privacy-policy">Privacy Policy</Link>
  </Text>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>re:meme</title>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} appInfo={{appName: 're:meme', disclaimer: Disclaimer }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </PersistGate> 
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}

export default MyApp
