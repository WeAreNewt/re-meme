import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloLink,
    NormalizedCacheObject
  } from "@apollo/client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { RefreshData } from "../models/Auth/auth.model";
import { REFRESH_AUTHENTICATION } from "../queries/auth";
import { selectedEnvironment } from "./environments";
import { setContext } from "@apollo/client/link/context";
import result from "../models/lensApi.model";
import { store } from "../redux/store";
import apolloLogger from 'apollo-link-logger'


const isServer = typeof window === 'undefined'

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
  let accessToken : string | null = null
  let refreshToken : string | null = null
  if(window) {
    const tokens = store.getState().auth
    if(tokens) {
      accessToken = tokens.accessToken
      refreshToken = tokens.refreshToken
    }
  }
  if(!accessToken || !refreshToken) {
    return Promise.resolve({})
  }
  const decoded = jwtDecode<RefreshJwt>(accessToken)
  if(Date.now() >= (decoded.exp - 10) * 1000) {
    return axios.post<RefreshData>(selectedEnvironment.lensApiUrl, {
        query: REFRESH_AUTHENTICATION,
        variables: {
          request: { refreshToken }
        }
    }, { headers: { 'Content-Type': 'application/json' } })
    .then(data => {
      if(window) {
        window.localStorage.setItem("auth", JSON.stringify(data.data.data.refresh))
        accessToken = data.data.data.refresh.accessToken
      }
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

let _spaClient : ApolloClient<NormalizedCacheObject> | null = null

export const generateApolloClient = () => {
  if(isServer) {
    return new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache({}),
      link: ApolloLink.from([
        httpLink
      ])
    })
  } else {
    if(_spaClient) return _spaClient
    _spaClient = new ApolloClient({
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
    return _spaClient
  }
}

export const ssrClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({}),
    link: ApolloLink.from([
      apolloLogger,
      httpLink
    ])
})
