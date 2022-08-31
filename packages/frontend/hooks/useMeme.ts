import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { ExplorePublicationsData, ExplorePublicationsParams, GetPublicationData, GetPublicationParams, GetPublicationsData, HasTxBeenIndexedData, HasTxBeenIndexedParams, PublicationData } from "../models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS, GET_PUBLICATION, HAS_TX_BEEN_INDEXED } from "../queries/publication";
import axios from 'axios';
import { resolve } from "path";

interface UseMemeReturn {
    publication?: PublicationData
}

type UseMemeFromPublicationId = (publicationId?: string, isLoading?: boolean) => UseMemeReturn

export const useMemeFromPublicationId : UseMemeFromPublicationId = (publicationId, isLoading) => {

    const [ publication, setPublication ]  = useState<PublicationData>()

    const [ getPublication ] = useLazyQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                publicationId: publicationId
            }
        }
    })

    useEffect(() => {
        if(!isLoading) {
            if(publicationId) {
                getPublication().then(data => {
                    setPublication(data.data?.publication)
                })
            }
        }
    }, [getPublication, publicationId, isLoading])

    return { publication }
}

type UseRandomMeme = () => UseMemeReturn

const sortCriterias = ['TOP_COMMENTED', 'TOP_COLLECTED', 'LATEST']

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const useRandomMeme : UseRandomMeme = () => {

    const [publication, setPublication] = useState<PublicationData>()

    const [ getPublication ] = useLazyQuery<ExplorePublicationsData, ExplorePublicationsParams>(EXPLORE_PUBLICATIONS)

    const blackListed = async (id) => {
        const response = await axios.get(`/api/blacklist/`, {params: {postId: id}}).then((response) => response.data.blacklisted)
        return response
    }

    useEffect(() => {
        getPublication({
            variables: {
                request: {
                    sortCriteria: sortCriterias[getRandomNumber(sortCriterias.length)],
                    sources: [process.env.NEXT_PUBLIC_APP_ID || ''],
                    limit: 50,
                    timestamp: 1654052400
                }
            }
        }).then(async data =>{
            var publcId = data.data?.explorePublications.items[getRandomNumber(data.data.explorePublications.items.length)]

            if(!process.env.NEXT_PUBLIC_BLACKLIST_OFF) {
                while(await blackListed(publcId?.id)){
                    publcId = data.data?.explorePublications.items[getRandomNumber(data.data.explorePublications.items.length)]
                }
            }
             setPublication(publcId)
            })
    }, [getPublication])

    return { publication }
}

interface UseMemeFromTxHashReturn {
    publication?: PublicationData
    loading: boolean
    error: boolean
}

type UseMemeFromTxHash = (txHash?: string) => UseMemeFromTxHashReturn

export const useMemeFromTxHash : UseMemeFromTxHash = (txHash) => {

    const [ publication, setPublication ] = useState<PublicationData>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false);

    const [ getPublication ] = useLazyQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                txHash
            }
        }
    })

    const [ _, { data: hasTxHashBeenIndexedData, error: hasTxHashBeenIndexedError, startPolling, stopPolling } ] = useLazyQuery<HasTxBeenIndexedData, HasTxBeenIndexedParams>(HAS_TX_BEEN_INDEXED, {
        variables: {
            request: {
                txHash
            }
        },
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        if(txHash) {
            setLoading(true)
            startPolling(5000)
        }
    }, [txHash, startPolling])

    useEffect(() => {
        if(hasTxHashBeenIndexedError) {
            setLoading(false)
            stopPolling()
        }
    }, [ hasTxHashBeenIndexedError, stopPolling])

    useEffect(() => {
        if(hasTxHashBeenIndexedData?.hasTxHashBeenIndexed.indexed) {
            stopPolling()
            getPublication().then((publicationData) => {
                setPublication(publicationData.data?.publication)
                setLoading(false)
            })
        }
    }, [ hasTxHashBeenIndexedData, stopPolling, getPublication ])

    return { publication, loading, error }
}