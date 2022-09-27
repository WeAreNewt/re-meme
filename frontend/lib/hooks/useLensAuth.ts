import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDisconnect, useSigner } from "wagmi";
import { AuthenticateData, AuthenticateParams, ChallengeData, ChallengeParams } from "../models/Auth/auth.model";
import { AUTHENTICATION, GET_CHALLENGE } from "../queries/auth";
import { setTokens } from "../redux/slices/auth";
import { RootState } from "../redux/store";

const useLensAuth = (address?: string | null) => {

    const { data: signer } = useSigner()
    const auth = useSelector((state: RootState) => state.auth)
    const [ getChallenge ] = useLazyQuery<ChallengeData, ChallengeParams>(GET_CHALLENGE, {
        fetchPolicy: 'network-only'
    })
    const [ postAuthentication ] = useMutation<AuthenticateData, AuthenticateParams>(AUTHENTICATION)
    const dispatch = useDispatch()
    const { disconnect } = useDisconnect()

    useEffect(() => {
        if(address && signer && !auth.accessToken ) {
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

    return { haveAuth: auth }
}

export default useLensAuth;
