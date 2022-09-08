import { useRouter } from "next/router";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FeedbackStep from "../../../../components/FeedbackStep";
import { ConnectionBox } from "../../../../components/Layout/ConnectionBox";
import Loader from "../../../../components/Loader";
import { useMemeFromPublicationId } from "../../../../hooks/useMeme";
import { User } from "../../../../models/User/user.model";

const Success : React.FC = () => {
    const router = useRouter()
    const { publicationId } = router.query
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const { publication, loading, error } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)


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
                            !user && (
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
                                    publication && <FeedbackStep publication={publication} />
                                )
                            }
                        </Row>
                    </article>
                </Col>
            </Row>
        </Container>
    );
}

export default Success;
