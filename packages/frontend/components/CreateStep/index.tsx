import { ChangeEventHandler } from "react";
import { MemeDetail } from "../Meme/MemeDetail";
import { PublicationData } from "../../models/Publication/publication.model";

interface CreateStepProps {
    meme: PublicationData
    setInitialImage: (image: string) => void
    goNext: () => void
}

const CreateStep: React.FC<CreateStepProps> = ({ meme, setInitialImage, goNext }) => {
    const uploadMeme = () => {
        document.getElementById("select-meme")!.click()
    }

    const fileSelectHandler: ChangeEventHandler<HTMLInputElement> = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) return;
                setInitialImage(e.target.result?.toString())
                goNext()
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            <MemeDetail meme={meme} inspired />
            <div className="main-container w-full lg:w-2/5">
                <p className="text-subtitle-1 mb-[40px]">Create new meme</p>
                <button onClick={uploadMeme} className="btn-medium w-full mb-[16px]">Upload image</button>
                <button onClick={goNext} className="btn-medium-secondary w-full">Start from blank canvas</button>
                <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />
            </div>
        </div>
    );
}

export default CreateStep;
