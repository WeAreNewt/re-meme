import { useRouter } from "next/router";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditStep from "../../../../components/EditStep";
import { ConnectionBox } from "../../../../components/Layout/ConnectionBox";
import Loader from "../../../../components/Loader";
import { useMemeFromPublicationId } from "../../../../lib/hooks/useMeme";
import { PublicationData } from "../../../../lib/models/Publication/publication.model";
import { RootState } from "../../../../lib/redux/store";

const Edit = () => {
    const router = useRouter()
    const { publicationId } = router.query
    const selectedProfile = useSelector((store: RootState) => store.user.selectedProfile)
    const { publication, error, loading } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)

    const onUpload = (newPublication: PublicationData) => {
        router.push(`/meme/${newPublication.id}/success`)
    }

    useEffect(() => {
        // this should be handled server side
        if(error) router.push('/404')
    }, [error, router])

    return (
        <Container fluid="md" className='h-full'>
            <Row className='mt-auto'>
            <Col>
                <article className='space-y-10'>
                {
                    !selectedProfile && (
                        <header className="hidden lg:block">
                            <ConnectionBox />
                        </header>
                    )
                }
                <Row>
                    {
                        loading ? (
                        <div className="h-20 flex w-full items-center justify-center">
                            <Loader />
                        </div>
                        ) : (
                            typeof window !== 'undefined' && publication && <EditStep publication={publication} onUpload={onUpload} />
                        )
                    }
                </Row>
                </article>
            </Col>
            </Row>
        </Container>
    );
}

export default Edit;
