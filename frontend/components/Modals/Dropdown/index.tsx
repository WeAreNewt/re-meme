
import { ChangeEventHandler } from "react";
import { TextConfig } from "../EditTextModal";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import { setImage, removeImage } from '../../../store/reducers/image.reducer'
import { RootState } from "../../../store/store";

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
    const dispatch = useDispatch();

    const uploadMeme = () => {
        document.getElementById("select-meme")!.click()
    }
    const image = useSelector((state: RootState) => state.image.selectedImage);

    const fileSelectHandler: ChangeEventHandler<HTMLInputElement> = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) return;
                setInitialImage(e.target.result?.toString())
                dispatch(setImage(e.target.result?.toString()))
                
            };
            reader.readAsDataURL(input.target.files[0]);
        }
        router.push("/meme/create");
        setOpen({ open: false })
    }
    const router = useRouter();

    const startFromBlank = () => {
        dispatch(removeImage())
        setOpen({ open: false })
        router.push("/meme/create");
    }

    return (
        <>
            <div onMouseDown={(e) => e.stopPropagation()} className={`${open ? "block " : "hidden"} absolute comic-border rounded-4xl bg-white p-4 w-[350px] z-20 mt-2 right-2 lg:right-auto`}>

                <button onClick={uploadMeme} className="btn-medium w-full mb-[16px]">Upload image</button>
                <button onClick={startFromBlank} className="btn-medium w-full">Start from blank canvas</button>
                <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />
            </div>
            <div onMouseDown={() => setOpen({ open: false })} className={`${open ? "block " : "hidden"} absolute h-full w-full top-0 left-0`} />
        </>
    )

}

export default Dropdown