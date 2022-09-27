import { useRouter } from "next/router";
import CreateFromPublicationStep from "../../../components/CreateFromPublicationStep";
import Head from "next/head";
import { selectedEnvironment } from "../../../lib/config/environments";
import { parseIpfs } from "../../../lib/utils/link";
import { ssrClient } from "../../../lib/config/apollo";
import { GET_PUBLICATION } from "../../../lib/queries/publication";
import { GetPublicationData, GetPublicationParams } from "../../../lib/models/Publication/publication.model";

const MemePage = ({ publication }) => {
    const router = useRouter()
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
        <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
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
  
  return { props: {
    publication: data.publication
  }}
}

export default MemePage
