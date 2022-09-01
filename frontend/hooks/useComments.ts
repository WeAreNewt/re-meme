import { useQuery } from "@apollo/client";
import { GetPublicationsData, GetPublicationsParams } from "../models/Publication/publication.model";
import { GET_PUBLICATIONS } from "../queries/publication";

export const useComments = (publicationId: string) => {
    const { data } = useQuery<GetPublicationsData, GetPublicationsParams>(GET_PUBLICATIONS, {
        variables: {
            request: {
                commentsOf: publicationId,
                sources: [process.env.NEXT_PUBLIC_APP_ID || ''],
                limit: 10
            }
        }
    })

    return { data }
}

export default useComments;
