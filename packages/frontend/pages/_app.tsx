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
  ApolloProvider,
  createHttpLink,
  ApolloLink
} from "@apollo/client";
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { setContext } from "@apollo/client/link/context";
import jwtDecode from 'jwt-decode';
import { REFRESH_AUTHENTICATION } from '../queries/auth';
import axios from 'axios';
import { RefreshData } from '../models/Auth/auth.model';
import { setTokens } from '../store/reducers/auth.reducer';

const API_URL = 'https://api-mumbai.lens.dev'

interface RefreshJwt {
  id: string
  role: string
  iat: number
  exp: number
}

const httpLink = createHttpLink({
    uri: API_URL
})

const authLink = setContext(() => {
  const accessToken = store.getState().auth.accessToken
  const refreshToken = store.getState().auth.refreshToken
  if(!accessToken || !refreshToken) return Promise.resolve({})
  const decoded = jwtDecode<RefreshJwt>(accessToken)
  if(Date.now() >= (decoded.exp - 10) * 1000) {
    return axios.post<RefreshData>(API_URL, {
        query: REFRESH_AUTHENTICATION,
        variables: {
          request: { refreshToken }
        }
    }, { headers: { 'Content-Type': 'application/json' } })
    .then(data => {
      store.dispatch(setTokens(data.data.data.refresh))
      return {
        headers: {
          'x-access-token': `Bearer ${data.data.data.refresh.accessToken}`
        }
      }
    })
  }
  return Promise.resolve({
    headers: {
      'x-access-token': `Bearer ${accessToken}`,
    }
  })
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache({
    addTypename: false
  })
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
