import { PublicationData } from "../../lib/models/Publication/publication.model";
import { MemeDetail } from "../Meme/MemeDetail";
import { RemixCreatedBox } from "../Remix/RemixCreatedBox";

interface FeedbackStepProps {
    publication: PublicationData
}

const FeedbackStep : React.FC<FeedbackStepProps> = ({ publication }) => {

    return (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            <MemeDetail meme={publication} />
            <RemixCreatedBox meme={publication} />
        </div>
    );
}

export default FeedbackStep;
