import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { EnabledCurrenciesData } from "../models/Module/module.mode";
import { ENABLED_CURRENCIES } from "../queries/module";
import { RootState } from "../redux/store";

const useLensModuleEnabledCurrencies = () => {

    const auth = useSelector((state: RootState) => state.auth)

    const [ getCurrencies, { data } ] = useLazyQuery<EnabledCurrenciesData>(ENABLED_CURRENCIES)

    useEffect(() => {
        if(auth && auth.accessToken) getCurrencies()
    }, [getCurrencies, auth])

    const currencies = useMemo(() => {
        return data?.enabledModuleCurrencies ? data.enabledModuleCurrencies : []
    }, [data])

    return { currencies }
}

export default useLensModuleEnabledCurrencies;
