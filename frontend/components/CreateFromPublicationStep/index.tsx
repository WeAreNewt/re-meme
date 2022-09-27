import { PublicationData } from "../../lib/models/Publication/publication.model";
import { MemeDetail } from "../Meme/MemeDetail";
import { RemixBtnBox } from "../Remix/RemixBtnBox";
import { RemixShareBox } from "../Remix/RemixShareBox";

interface CreateStepProps {
    publication?: PublicationData
    handleRemixMeme: () => void
}

const CreateFromPublicationStep : React.FC<CreateStepProps> = ({ publication, handleRemixMeme }) => {
    return (
        <section className='flex flex-col sm:flex-col lg:flex-row gap-6 items-start'>
            {
                publication ? (
                    <>
                        <MemeDetail meme={publication} />
                        <div className='flex flex-col space-y-10 w-full h-auto lg:w-2/5'>
                            <RemixBtnBox onRemixBtnClicked={handleRemixMeme} />
                            <RemixShareBox publication={publication} />
                        </div>
                    </>
                ) :
                null
            }
        </section>
    );
}

export default CreateFromPublicationStep;
