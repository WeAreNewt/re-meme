import { useRouter } from "next/router";
import { useEffect } from "react";
import EditStep from "../../../../components/EditStep";
import Loader from "../../../../components/Loader";
import { useMemeFromPublicationId } from "../../../../lib/hooks/useMeme";
import { PublicationData } from "../../../../lib/models/Publication/publication.model";

const Edit = () => {
    const router = useRouter()
    const { publicationId } = router.query
    const { publication, error, loading } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)

    const onUpload = (newPublication: PublicationData) => {
        router.push(`/meme/${newPublication.id}/success`)
    }

    useEffect(() => {
        // this should be handled server side
        if(error) router.push('/404')
    }, [error, router])

    return loading ? (
        <div className="h-20 flex w-full items-center justify-center">
            <Loader />
        </div>
        ) : (
            publication && <EditStep publication={publication} onUpload={onUpload} />
        )
}

export default Edit;
