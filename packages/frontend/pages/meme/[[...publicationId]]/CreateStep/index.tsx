import { MemeDetail } from "../../../../components/Meme/MemeDetail";
import { RemixBtnBox } from "../../../../components/Remix/RemixBtnBox";
import { RemixShareBox } from "../../../../components/Remix/RemixShareBox";
import { PublicationData } from "../../../../models/Publication/publication.model";

interface CreateStepProps {
    publication: PublicationData
    handleRemixMeme: () => void
}

const CreateStep : React.FC<CreateStepProps> = ({ publication, handleRemixMeme }) => {
    return (
        <section className='flex flex-col sm:flex-col lg:flex-row gap-6 items-start'>
            <MemeDetail meme={publication} />
            <div className='flex flex-col space-y-10 w-full h-auto lg:w-2/5'>
            <RemixBtnBox onRemixBtnClicked={handleRemixMeme} />
            <RemixShareBox meme={publication} />
            </div>
        </section>
    );
}

export default CreateStep;
