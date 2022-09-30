import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, DisclaimerComponent } from '@rainbow-me/rainbowkit';
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import PageLayout from '../components/Layout';
import wagmiClient, { chains } from '../lib/config/wagmi';
import Head from 'next/head'
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css'
import { wrapper } from '../lib/redux/store';
import { generateApolloClient } from '../lib/config/apollo';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://rememe.lol/terms-of-service">Terms of Service</Link> and
    acknowledge you have read and understand the app{' '}
    <Link href="https://rememe.lol/privacy-policy">Privacy Policy</Link>
  </Text>
);

function MyApp({ Component, ...rest }: AppProps) {

  const apolloClient = generateApolloClient()
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Head><title>re:meme</title></Head>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider coolMode chains={chains} appInfo={{appName: 're:meme', disclaimer: Disclaimer }}>
              <PageLayout>
                <Component {...props.pageProps} />
              </PageLayout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
