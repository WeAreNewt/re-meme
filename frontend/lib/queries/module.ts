import { gql } from "@apollo/client";

export const ENABLED_CURRENCIES = gql`
  query {
    enabledModuleCurrencies {
      name
      symbol
      decimals
      address
    }
  }
`
