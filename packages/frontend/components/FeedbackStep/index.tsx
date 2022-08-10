import { useMemeFromTxHash } from "../../hooks/useMeme";
import { MemeDetail } from "../Meme/MemeDetail";
import { RemixCreatedBox } from "../Remix/RemixCreatedBox";

interface FeedbackStepProps {
    txHash: string
}

const FeedbackStep : React.FC<FeedbackStepProps> = ({ txHash }) => {

    const { publication } = useMemeFromTxHash(txHash)

    return (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            {
                publication && (
                    <>
                        <MemeDetail meme={publication} />
                        <RemixCreatedBox meme={publication} />
                    </>
                )
            }
        </div>
    );
}

export default FeedbackStep;
