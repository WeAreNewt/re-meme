import { useRouter } from "next/router";
import { useEffect } from "react";
import FeedbackStep from "../../../../components/FeedbackStep";
import Loader from "../../../../components/Loader";
import { useMemeFromPublicationId } from "../../../../lib/hooks/useMeme";

const Success = () => {
    const router = useRouter()
    const { publicationId } = router.query
    const { publication, loading, error } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)


    useEffect(() => {
        // this should be handled server side
        if(error) router.push('/404')
    }, [error, router])

    return loading ? (
            <div className="h-20 flex w-full items-center justify-center">
                <Loader />
            </div>
        ) : (
            publication && <FeedbackStep publication={publication} />
        )
}

export default Success;
