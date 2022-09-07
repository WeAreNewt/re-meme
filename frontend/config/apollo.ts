import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloLink
  } from "@apollo/client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { RefreshData } from "../models/Auth/auth.model";
import { REFRESH_AUTHENTICATION } from "../queries/auth";
import { setTokens } from "../store/reducers/auth.reducer";
import { store } from "../store/store";
import { selectedEnvironment } from "./environments";
import { setContext } from "@apollo/client/link/context";
import result from "../models/lensApi.model";


interface RefreshJwt {
    id: string
    role: string
    iat: number
    exp: number
  }

const httpLink = createHttpLink({
    uri: selectedEnvironment.lensApiUrl
})

const authLink = setContext(() => {
  const accessToken = store.getState().auth.accessToken
  const refreshToken = store.getState().auth.refreshToken
  if(!accessToken || !refreshToken) return Promise.resolve({})
  const decoded = jwtDecode<RefreshJwt>(accessToken)
  if(Date.now() >= (decoded.exp - 10) * 1000) {
    return axios.post<RefreshData>(selectedEnvironment.lensApiUrl, {
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
      possibleTypes: result.possibleTypes,
      typePolicies: {
        PublicationsQueryRequest: {
          queryType: true
        }
      }
    })
});

export const ssrClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({}),
    uri: selectedEnvironment.lensApiUrl
})

export default client;
