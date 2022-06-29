import { ChangeEventHandler } from "react";
import { MemeData } from "..";
import { MemeDetail } from "../../../../components/Meme/MemeDetail";

interface CreateStepProps {
    meme: MemeData
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
            <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full">
                <p className="text-3xl font-bold mb-8">Create new meme</p>
                <button onClick={uploadMeme} className="comic-border-mini rounded-full bg-purple py-1 font-medium w-full lg:w-4/5 mb-3">Upload image</button>
                <button onClick={goNext} className="comic-border-mini rounded-full bg-white py-1 font-medium w-full lg:w-4/5">Start from blank canvas</button>
                <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />
            </div>
        </div>
    );
}

export default CreateStep;
