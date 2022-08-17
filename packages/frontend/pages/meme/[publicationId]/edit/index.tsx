import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditStep from "../../../../components/EditStep";
import FeedbackStep from "../../../../components/FeedbackStep";
import { ConnectionBox } from "../../../../components/Layout/ConnectionBox";
import { useMemeFromPublicationId } from "../../../../hooks/useMeme";
import useWindowDimensions from "../../../../hooks/window-dimensions.hook";
import { User } from "../../../../models/User/user.model";

const Edit = () => {
    const [txHash, setTxHash] = useState<string>()
    const router = useRouter()
    const { publicationId } = router.query
    const { width } = useWindowDimensions();
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const [ step, setStep ] = useState(0)
    const { publication } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)

    const onUpload = (txHash) => {
        setTxHash(txHash)
        setStep(1)
      }

    return (
        <Container fluid="md" className='h-full'>
            <Row className='mt-auto'>
            <Col>
                <article className='space-y-10'>
                {
                    width > 850 && !user ?
                    <header>
                        <ConnectionBox />
                    </header>
                    : null
                }
                <Row>
                    { publication && step == 0 && <EditStep publication={publication} onUpload={onUpload} /> }
                    { step === 1 && txHash && <FeedbackStep txHash={txHash} />}
                </Row>
                </article>
            </Col>
            </Row>
        </Container>
    );
}

export default Edit;
