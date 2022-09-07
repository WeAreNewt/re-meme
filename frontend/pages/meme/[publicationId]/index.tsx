import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../../../components/CreateFromPublicationStep";
import { ConnectionBox } from "../../../components/Layout/ConnectionBox";
import { User } from "../../../models/User/user.model";
import Head from "next/head";
import { selectedEnvironment } from "../../../config/environments";
import { parseIpfs } from "../../../utils/link";
import { ssrClient } from "../../../config/apollo";
import { GET_PUBLICATION } from "../../../queries/publication";
import { GetPublicationData, PublicationData } from "../../../models/Publication/publication.model";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

interface MemePageProps {
  publication: PublicationData
}

interface MemePageQueryParams extends ParsedUrlQuery {
  publicationId: string
}

const MemePage: React.FC<MemePageProps> = ({ publication }) => {
    const router = useRouter()
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const handleRemixMeme = () => {
      router.push(`/meme/${publication.id}/edit`)
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
                  !user && (
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
      </>
    )
}

export const getServerSideProps: GetStaticProps<MemePageProps, MemePageQueryParams> = async (context) => {

  const params = context.params

  if(!params?.publicationId) return { notFound: true }

  const publication = await ssrClient.query<GetPublicationData>({ query: GET_PUBLICATION, variables: {
    request: {
        publicationId: params.publicationId
    }
  }})

  if(publication.errors || publication.error || !publication.data.publication) {
    return {
      notFound: true
    }
  }

  /*

  if(!process.env.NEXT_PUBLIC_BLACKLIST_OFF) {
    const blacklisted = await axios.get(`/api/blacklist/`, {params: { postId: publication.data.publication.id }}).then((response) => response.data.blacklisted)
    if(blacklisted) {
      return {
        notFound: true
      }
    }
  }

  */

  return {
    props: {
      publication: publication.data.publication
    }
  }
}

export default MemePage
