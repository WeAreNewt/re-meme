import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ExplorePublicationsData, ExplorePublicationsParams, GetPublicationData, GetPublicationParams, GetPublicationsData, PublicationData } from "../models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS, GET_PUBLICATION } from "../queries/publication";

interface UseMemeReturn {
    publication?: PublicationData
}

type UseMemeFromPublicationId = (publicationId?: string) => UseMemeReturn

export const useMemeFromPublicationId : UseMemeFromPublicationId = (publicationId) => {

    const [ publication, setPublication ]  = useState<PublicationData>()

    const [ getPublication ] = useLazyQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                publicationId: publicationId
            }
        }
    })
    const [ getRandomPublication ] = useLazyQuery<ExplorePublicationsData, ExplorePublicationsParams>(EXPLORE_PUBLICATIONS, {
        variables: {
            request: {
                sortCriteria: 'LATEST',
                sources: [process.env.NEXT_PUBLIC_APP_ID || ''],
                limit: 1
            }
        }
    })

    useEffect(() => {
        if(publicationId) {
            getPublication().then(data => {
                setPublication(data.data?.publication)
            })
        } else {
            getRandomPublication().then(data => {
                setPublication(data.data?.explorePublications.items[0])
            })
        }
    }, [getPublication, getRandomPublication, publicationId])

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