import { NextPage } from "next"
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import { ConnectionBox } from "../components/Layout/ConnectionBox";
import Loader from "../components/Loader";
import { ssrClient } from "../lib/config/apollo";
import { selectedEnvironment } from "../lib/config/environments";
import { useRandomMeme } from "../lib/hooks/useMeme";
import { ExplorePublicationsData, ExplorePublicationsParams } from "../lib/models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS } from "../lib/queries/publication";
import { RootState } from "../lib/redux/store";

const Home = ({ publication }) => {
    const router = useRouter()
    const selectedProfile = useSelector((store: RootState) => store.user.selectedProfile)
  
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
    }
  
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
                  <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
              </Row>
            </article>
          </Col>
        </Row>
      </Container>
    )
}

export const getServerSideProps = async () => {

  const getRandomNumber = (max: number) => Math.floor(Math.random() * max)
  const sortCriterias = ['TOP_COMMENTED', 'TOP_COLLECTED', 'LATEST']

  const { data } = await ssrClient.query<ExplorePublicationsData, ExplorePublicationsParams>({
    query: EXPLORE_PUBLICATIONS,
    variables: {
      request: {
        sortCriteria: sortCriterias[getRandomNumber(sortCriterias.length)],
        sources: [selectedEnvironment.appId],
        limit: 50,
        timestamp: 1654052400,
        publicationTypes: ['COMMENT', 'POST']
      }
    }
  })

  console.log(data)

  const itemsLength = data.explorePublications.items.length

  return { props: {
    publication: data.explorePublications.items[getRandomNumber(itemsLength)]
  }}
}

export default Home;
