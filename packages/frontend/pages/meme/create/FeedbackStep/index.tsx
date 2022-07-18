import { MemeDetail } from "../../../../components/Meme/MemeDetail";
import { RemixCreatedBox } from "../../../../components/Remix/RemixCreatedBox";

interface FeedbackStepProps {
    image: string
}

const FeedbackStep : React.FC<FeedbackStepProps> = ({ image }) => {

    const blob = new Blob([image], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    const mockedMeme = {
        id: 1,
        src: url,
        mockProfile: {
            id: 1,
            name: "cryptopunk",
            profilePic: "/assets/imgs/punk.png"
        },
        remixCount: 210,
        publicationDate: new Date().getTime()
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            <MemeDetail meme={mockedMeme} />
            <RemixCreatedBox meme={mockedMeme} />
        </div>
    );
}

export default FeedbackStep;
