import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ConnectionBox } from "../../../components/Layout/ConnectionBox";
import useMeme from "../../../hooks/useMeme";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { User } from "../../../models/User/user.model";
import EditStep from "../create/EditStep";
import CreateStep from "./CreateStep";

const MemePage: NextPage = () => {
    const { width } = useWindowDimensions();
    const [ step, setStep ] = useState(0)
    const router = useRouter()
    const { publicationId } = router.query
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const { data } = useMeme(Array.isArray(publicationId) ? publicationId[0] : publicationId)
    const handleRemixMeme = () => {
      setStep(1)
    }

    const onUpload = () => {

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
                { data && step == 0 && <CreateStep publication={data.publication} handleRemixMeme={handleRemixMeme} />}
                { data && step == 1 && <EditStep publication={data.publication} onUpload={onUpload} /> }
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    )
}

export default MemePage
