import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { ExplorePublicationsData, ExplorePublicationsParams, GetPublicationData, GetPublicationParams, GetPublicationsData, PublicationData } from "../models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS, GET_PUBLICATION } from "../queries/publication";

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
        }).then(data => setPublication(data.data?.explorePublications.items[getRandomNumber(data.data.explorePublications.items.length)]))
    }, [getPublication])

    return { publication }
}

type UseMemeFromTxHash = (publicationId?: string) => UseMemeReturn

export const useMemeFromTxHash : UseMemeFromTxHash = (txHash) => {

    const { data } = useQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                txHash
            }
        }
    })
    return { publication: data?.publication }
}