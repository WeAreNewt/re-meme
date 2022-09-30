import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import { ssrClient } from "../lib/config/apollo";
import { selectedEnvironment } from "../lib/config/environments";
import { ExplorePublicationsData, ExplorePublicationsParams } from "../lib/models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS } from "../lib/queries/publication";
import { setImageSize } from "../lib/redux/slices/imagesize";
import { RootState } from "../lib/redux/store";

const Home = ({ publication }) => {
    const router = useRouter()
    const imagesize = useSelector((state: RootState) => state.imagesize.selectedImageSize);
    const dispatch = useDispatch();
    
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
      dispatch(setImageSize(false))
    }
  
    return <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
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

  const itemsLength = data.explorePublications.items.length

  return { props: {
    publication: data.explorePublications.items[getRandomNumber(itemsLength)]
  }}
}

export default Home;
