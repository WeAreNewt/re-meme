
import { ChangeEventHandler } from "react";
import { TextConfig } from "../EditTextModal";
import { useRouter } from 'next/router';
interface State {
    open: boolean
}

interface DropdownModalProps {
    open: boolean
    setOpen: ({ open }: State) => void
    setInitialImage: (image: string) => void
    goNext: () => void
}


const Dropdown: React.FC<DropdownModalProps> = (props) => {
    const { open, setOpen, setInitialImage, goNext } = props
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
    const router = useRouter();

    const startFromBlank = () => {
        router.push("/meme/create");
    }

    return (
        <div onMouseDown={() => setOpen({ open: false })} className={`${open ? "block " : "hidden"} absolute h-full w-full z-40 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className={`${open ? "block " : "hidden"} comic-border rounded-4xl bg-white p-4 flex flex-col w-full lg:w-1/5  `}>

                <button onClick={uploadMeme} className="btn-medium w-full mb-[16px]">Upload image</button>
                <button onClick={startFromBlank} className="btn-medium w-full">Start from blank canvas</button>
                <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />

            </div>
        </div>
    )

}

export default Dropdown