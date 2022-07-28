import { NextPage } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../../../components/CreateFromPublicationStep";
import { ConnectionBox } from "../../../components/Layout/ConnectionBox";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { User } from "../../../models/User/user.model";
import EditStep from "../../../components/EditStep";
import { useMemeFromPublicationId } from "../../../hooks/useMeme";
import FeedbackStep from "../../../components/FeedbackStep";

const MemePage: NextPage = () => {
    const [txHash, setTxHash] = useState<string>()
    const { width } = useWindowDimensions();
    const [ step, setStep ] = useState(0)
    const router = useRouter()
    const { publicationId } = router.query
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const { publication } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId)
    const handleRemixMeme = () => {
      setStep(1)
    }

    const onUpload = (txHash) => {
      setTxHash(txHash)
      setStep(2)
    }
  
    return (
      <Container fluid="md" className='h-full'>
        <Row className='mt-auto'>
          <Col>
            <article className='space-y-10'>
              {
                width > 850 && !user ?
                  <Row>
                    <Col>
                      <header>
                        <ConnectionBox />
                      </header>
                    </Col>
                  </Row>
                  : null
              }
              <Row>
                { publication && step == 0 && <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />}
                { publication && step == 1 && <EditStep publication={publication} onUpload={onUpload} /> }
                { step === 2 && txHash && <FeedbackStep txHash={txHash} />}
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    )
}

export default MemePage
