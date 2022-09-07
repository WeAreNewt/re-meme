import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { EnabledCurrenciesData } from "../models/Module/module.mode";
import { ENABLED_CURRENCIES } from "../queries/module";
import { AuthSlice } from "../store/reducers/auth.reducer";
import { RootState } from "../store/store";

const useLensModuleEnabledCurrencies = () => {

    const auth: AuthSlice = useSelector((state: RootState) => state.auth)

    const [ getCurrencies, { data } ] = useLazyQuery<EnabledCurrenciesData>(ENABLED_CURRENCIES)

    useEffect(() => {
        if(auth.accessToken) getCurrencies()
    }, [getCurrencies, auth.accessToken])

    const currencies = useMemo(() => {
        return data?.enabledModuleCurrencies ? data.enabledModuleCurrencies : []
    }, [data])

    return { currencies }
}

export default useLensModuleEnabledCurrencies;
