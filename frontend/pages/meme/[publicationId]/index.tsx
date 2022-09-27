import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../../../components/CreateFromPublicationStep";
import { ConnectionBox } from "../../../components/Layout/ConnectionBox";
import Head from "next/head";
import { selectedEnvironment } from "../../../lib/config/environments";
import { parseIpfs } from "../../../lib/utils/link";
import { RootState } from "../../../lib/redux/store";
import { ssrClient } from "../../../lib/config/apollo";
import { GET_PUBLICATION } from "../../../lib/queries/publication";
import { GetPublicationData, GetPublicationParams } from "../../../lib/models/Publication/publication.model";

const MemePage = ({ publication }) => {
    const router = useRouter()
    const selectedProfile = useSelector((store: RootState) => store.user.selectedProfile)
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
    }

    return (
      <>
        <Head>
          <meta property="og:url" content={`${selectedEnvironment.appUrl}/meme/${publication?.id}`} />
          <meta property="twitter:url" content={`${selectedEnvironment.appUrl}/meme/${publication?.id}`} />
          <meta property="og:image" content={parseIpfs(publication?.metadata.media[0].original.url || '')} />
          <meta property="twitter:image" content={parseIpfs(publication?.metadata.media[0].original.url || '')} />
        </Head>
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
                  publication && <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
                }
              </Row>
              </article>
            </Col>
          </Row>
        </Container>
      </>
    )
}

export const getServerSideProps = async (context) => {

  const { publicationId } = context.query

  const { data } = await ssrClient.query<GetPublicationData, GetPublicationParams>({
    query: GET_PUBLICATION,
    variables: {
      request: {
        publicationId
      }
    }
  })

  console.log(data)

  return { props: {
    publication: data.publication
  }}
}

export default MemePage
