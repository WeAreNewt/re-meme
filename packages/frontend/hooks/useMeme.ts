import { useQuery } from "@apollo/client";
import { GetPublicationData, GetPublicationParams } from "../models/Publication/publication.model";
import { GET_PUBLICATION } from "../queries/publication";

interface UseMemeReturn {
    data?: GetPublicationData
}

type UseMemeFromPublicationId = (publicationId?: string) => UseMemeReturn

export const useMemeFromPublicationId : UseMemeFromPublicationId = (publicationId) => {

    const { data } = useQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                publicationId: publicationId || '0x3aed-0x13'
            }
        }
    })
    return { data }
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
    return { data }
}