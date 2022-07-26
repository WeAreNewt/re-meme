import { useQuery } from "@apollo/client";
import { GetPublicationData, GetPublicationParams } from "../models/Publication/publication.model";
import { GET_PUBLICATION } from "../queries/publication";

const useMeme = (publicationId: string | undefined) => {
    const { data } = useQuery<GetPublicationData, GetPublicationParams>(GET_PUBLICATION, {
        variables: {
            request: {
                publicationId: publicationId || '0x3aed-0x13'
            }
        }
    })
    return { data }
}

export default useMeme;
