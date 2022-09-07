import { NextPage } from "next"
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import { ConnectionBox } from "../components/Layout/ConnectionBox";
import Loader from "../components/Loader";
import { useRandomMeme } from "../hooks/useMeme";
import { RootState } from "../store/store";

const Home : NextPage = () => {
    const router = useRouter()
    const { publication, loading } = useRandomMeme()
    const user = useSelector((state: RootState) => state.user.selectedUser);
  
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
    }
  
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
                    publication && <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
                  )
                }
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    )
}

export default Home;
