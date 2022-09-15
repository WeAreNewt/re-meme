import { NextPage } from "next"
import { useRouter } from "next/router";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import Loader from "../components/Loader";
import { useRandomMeme } from "../hooks/useMeme";

const Home : NextPage = () => {
    const router = useRouter()
    const { publication, loading } = useRandomMeme()
  
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
    }
  
    return loading ? (
          <div className="h-20 flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
        )
}

export default Home;
