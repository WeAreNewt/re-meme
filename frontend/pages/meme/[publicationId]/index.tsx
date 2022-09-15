import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateFromPublicationStep from "../../../components/CreateFromPublicationStep";
import { ConnectionBox } from "../../../components/Layout/ConnectionBox";
import { User } from "../../../models/User/user.model";
import Head from "next/head";
import { selectedEnvironment } from "../../../config/environments";
import { parseIpfs } from "../../../utils/link";
import { useMemeFromPublicationId } from "../../../hooks/useMeme";
import Loader from "../../../components/Loader";
import { useEffect } from "react";

const MemePage = () => {
    const router = useRouter()
    const { publicationId } = router.query
    const user : User = useSelector((state: any) => state.user.selectedUser);
    const { publication, loading, error } = useMemeFromPublicationId(Array.isArray(publicationId) ? publicationId[0] : publicationId, !router.isReady)
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
    }

    useEffect(() => {
      // this should be handled server side
      if(error) router.push('/404')
    }, [error, router])

    return (
      <>
        <Head>
          <meta property="og:url" content={`${selectedEnvironment.appUrl}/meme/${publication?.id}`} />
          <meta property="twitter:url" content={`${selectedEnvironment.appUrl}/meme/${publication?.id}`} />
          <meta property="og:image" content={parseIpfs(publication?.metadata.media[0].original.url || '')} />
          <meta property="twitter:image" content={parseIpfs(publication?.metadata.media[0].original.url || '')} />
        </Head>
          {
            loading ? (
              <div className="h-20 flex w-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
            )
          }
      </>
    )
}

export default MemePage
