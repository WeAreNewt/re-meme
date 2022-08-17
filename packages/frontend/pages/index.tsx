import { NextPage } from "next"
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import { ConnectionBox } from "../components/Layout/ConnectionBox";
import useWindowDimensions from "../hooks/window-dimensions.hook";
import { User } from "../models/User/user.model";
import { useRandomMeme } from "../hooks/useMeme";

const Home : NextPage = () => {
    const { width } = useWindowDimensions();
    const router = useRouter()
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const { publication } = useRandomMeme()
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
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
                { publication && <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />}
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    )
}

export default Home;
