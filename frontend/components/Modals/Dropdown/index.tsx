
import { ChangeEventHandler } from "react";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { removeImage, setImage } from "../../../lib/redux/slices/image";
import { setImageSize } from "../../../lib/redux/slices/imagesize";

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

    const fileSelectHandler: ChangeEventHandler<HTMLInputElement> = (input) => {
        if (input.target.files && input.target.files[0]) {

            if (input.target.files[0].size > 1000000 ) {
                console.log('file size over 1 mb')
                dispatch(setImageSize(true))
            } else {
                dispatch(setImageSize(false))
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (!e.target?.result) return;
                    setInitialImage(e.target.result?.toString())
                    dispatch(setImage(e.target.result?.toString()))

                };
                reader.readAsDataURL(input.target.files[0]);
                setOpen({ open: false })
                router.push("/meme/create");
            }

        }
        
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

                <button onClick={uploadMeme} className="btn-medium w-full mb-[16px]">Upload a background image</button>
                <button onClick={startFromBlank} className="btn-medium w-full">Start from blank canvas</button>
                <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />
            </div>
            <div onMouseDown={() => setOpen({ open: false })} className={`${open ? "block " : "hidden"} absolute h-full w-full top-0 left-0`} />
        </>
    )

}

export default Dropdown