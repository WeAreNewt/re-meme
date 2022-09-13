import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
import { ExplorePublicationsData, ExplorePublicationsParams, GetPublicationData, GetPublicationParams, GetPublicationsData, HasTxBeenIndexedData, HasTxBeenIndexedParams, PublicationData } from "../models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS, GET_PUBLICATION, HAS_TX_BEEN_INDEXED } from "../queries/publication";
import axios from 'axios';
import { selectedEnvironment } from "../config/environments";

const blackListed = async (id) => {
    const response = await axios.get(`/api/blacklist/`, {params: {postId: id}}).then((response) => response.data.blacklisted)
    return response
}


interface UseMemeFromPublicationIdReturn {
    publication?: PublicationData
    loading: boolean
    error?: Error
}

type UseMemeFromPublicationId = (publicationId?: string, isLoading?: boolean) => UseMemeFromPublicationIdReturn

export const useMemeFromPublicationId : UseMemeFromPublicationId = (publicationId, isLoading) => {

    const [ publication, setPublication ]  = useState<PublicationData>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ customError, setCustomError ] = useState<Error>()

    const [ getPublication, { error, data } ] = useLazyQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                publicationId: publicationId
            }
        }
    })

    useEffect(() => {
        if(!isLoading && publicationId) {
            setLoading(true)
            getPublication()
        }
    }, [getPublication, publicationId, isLoading])

    useEffect(() => {
        if(data && !error) {
            if(!process.env.NEXT_PUBLIC_BLACKLIST_OFF) {
                const checkBlackList = async () => {
                    blackListed(data.publication.id).then(isBlackListed => {
                        if(!isBlackListed) {
                            setPublication(data.publication)
                        } else {
                            setCustomError(new Error("Blacklisted"))
                        }
                    })
                    .catch(() => {
                        setCustomError(new Error("Failed to check blacklist"))
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                }
                checkBlackList()
            }
            else {
                setLoading(false)
                setPublication(data.publication)
            }
        } else if(error) {
            setLoading(false)
            setCustomError(error)
        }
    }, [data, error])

    return { publication, loading, error: customError }
}

interface UseRandomMemeReturn {
    publication?: PublicationData
    loading: boolean
    error?: ApolloError
    refetch?: () => void
}

type UseRandomMeme = () => UseRandomMemeReturn

const sortCriterias = ['TOP_COMMENTED', 'TOP_COLLECTED', 'LATEST']

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const useRandomMeme : UseRandomMeme = () => {

    const [publication, setPublication] = useState<PublicationData>()
    const [loading, setLoading] = useState<boolean>(true)

    const initialVariables = useMemo(() => ({
        request: {
            sortCriteria: sortCriterias[getRandomNumber(sortCriterias.length)],
            sources: [selectedEnvironment.appId],
            limit: 50,
            timestamp: 1654052400,
            publicationTypes: ['COMMENT', 'POST']
        }
    }), [])

    const { data, error, refetch } = useQuery<ExplorePublicationsData, ExplorePublicationsParams>(EXPLORE_PUBLICATIONS, {
        variables: initialVariables
    })

    useEffect(() => {
        if(data) {
            const pollBlacklist = async () => {
                const itemsLength = data.explorePublications.items.length
                if(!error && itemsLength) {
                    var publcId = data.explorePublications.items[getRandomNumber(itemsLength)]
                    if(!process.env.NEXT_PUBLIC_BLACKLIST_OFF) {
                        let isBlacklisted = await blackListed(publcId.id)
                        while(isBlacklisted){
                            isBlacklisted = await blackListed(data.explorePublications.items[getRandomNumber(itemsLength)].id)
                        }
                    }
                    setPublication(publcId)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
            pollBlacklist()
        }
    }, [data, error])

    return { publication, loading, error, refetch }
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