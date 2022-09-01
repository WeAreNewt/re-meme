import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDisconnect, useSigner } from "wagmi";
import { AuthenticateData, AuthenticateParams, ChallengeData, ChallengeParams } from "../models/Auth/auth.model";
import { AUTHENTICATION, GET_CHALLENGE } from "../queries/auth";
import { AuthSlice, setTokens } from "../store/reducers/auth.reducer";
import { RootState } from "../store/store";

const useLensAuth = (address?: string | null) => {

    const { data: signer } = useSigner()
    const auth = useSelector<RootState, AuthSlice>(state => state.auth)
    const [ getChallenge, { client } ] = useLazyQuery<ChallengeData, ChallengeParams>(GET_CHALLENGE)
    const [ postAuthentication ] = useMutation<AuthenticateData, AuthenticateParams>(AUTHENTICATION)
    const dispatch = useDispatch()
    const { disconnect } = useDisconnect()

    const haveAuth = useMemo(() => auth.accessToken && auth.refreshToken, [auth])

    useEffect(() => {
        if(address && signer && !auth.accessToken && !auth.refreshToken) {
            getChallenge({ variables: { request: { address } }}).then(challengeData => {
                const text = challengeData.data?.challenge.text
                if(text) {
                    signer.signMessage(text).then(signed => {
                        postAuthentication({ variables: { request: { address, signature: signed }}}).then(authenticationData => {
                            const jwtTokens = authenticationData.data?.authenticate
                            if(jwtTokens) {
                                dispatch(setTokens(jwtTokens))
                            }
                        })
                    }).catch(() => disconnect())
                }
            }).catch(() => disconnect())
        }
    }, [ address, signer, getChallenge, disconnect, dispatch, postAuthentication, auth ])

    return { haveAuth }
}

export default useLensAuth;
