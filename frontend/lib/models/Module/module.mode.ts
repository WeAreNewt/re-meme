export interface Currency {
    name: string
    symbol: string
    decimals: number
    address: string
}

export interface EnabledCurrenciesData {
    enabledModuleCurrencies: Currency[]
}
