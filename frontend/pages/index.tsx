import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import CreateFromPublicationStep from "../components/CreateFromPublicationStep";
import { generateApolloClient } from "../lib/config/apollo";
import { selectedEnvironment } from "../lib/config/environments";
import { ExplorePublicationsData, ExplorePublicationsParams } from "../lib/models/Publication/publication.model";
import { EXPLORE_PUBLICATIONS } from "../lib/queries/publication";
import { setImageSize } from "../lib/redux/slices/imagesize";
import { getBlacklistedFromDb } from "./api/blacklist";

const Home = ({ publication }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    
    const handleRemixMeme = () => {
      router.push(`/meme/${publication?.id}/edit`)
      dispatch(setImageSize(false))
    }
  
    return <CreateFromPublicationStep publication={publication} handleRemixMeme={handleRemixMeme} />
}

export const getServerSideProps = async () => {

  const client = generateApolloClient()

  const getRandomNumber = (max: number) => Math.floor(Math.random() * max)
  const sortCriterias = ['TOP_COMMENTED', 'TOP_COLLECTED', 'LATEST']

  const { data } = await client.query<ExplorePublicationsData, ExplorePublicationsParams>({
    query: EXPLORE_PUBLICATIONS,
    variables: {
      request: {
        sortCriteria: sortCriterias[getRandomNumber(sortCriterias.length)],
        sources: [selectedEnvironment.appId],
        limit: 50,
        timestamp: selectedEnvironment.startMemesTimestamp,
        publicationTypes: ['COMMENT', 'POST']
      }
    }
  })
  const itemsLength = data.explorePublications.items.length
  let selectedPublication = data.explorePublications.items[getRandomNumber(itemsLength)]
  if(!process.env.NEXT_PUBLIC_BLACKLIST_OFF) {
    let isBlacklisted = await getBlacklistedFromDb(selectedPublication.id)
    while(isBlacklisted.blacklisted) {
      selectedPublication = data.explorePublications.items[getRandomNumber(itemsLength)]
      isBlacklisted = await getBlacklistedFromDb(selectedPublication.id)
    }
  }
  return { props: {
    publication: selectedPublication
  }}
}

export default Home;
