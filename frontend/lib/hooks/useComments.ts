import { useQuery } from "@apollo/client";
import { selectedEnvironment } from "../config/environments";
import { GetPublicationsData, GetPublicationsParams } from "../models/Publication/publication.model";
import { GET_PUBLICATIONS } from "../queries/publication";

export const useComments = (publicationId: string) => {
    const { data } = useQuery<GetPublicationsData, GetPublicationsParams>(GET_PUBLICATIONS, {
        variables: {
            request: {
                commentsOf: publicationId,
                sources: [selectedEnvironment.appId],
                limit: 10
            }
        }
    })

    return { data }
}

export default useComments;
