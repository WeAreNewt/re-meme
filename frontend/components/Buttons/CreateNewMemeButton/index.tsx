import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useWindowDimensions from '../../../hooks/window-dimensions.hook';
import Dropdown from '../../Modals/Dropdown';
import EditTextModal, { EditText } from "../../Modals/EditTextModal";


type CreateNewMemeBtnProps = {
    disabled: boolean
}

export const CreateNewMemeBtn = ({ disabled }: CreateNewMemeBtnProps) => {
    const [dropdownModal, setdropdownModal] = useState({
        open: false
    })

    const [ step, setStep ] = useState(0);
    const [initialImage, setInitialImage] = useState<string>();

    const goNext = () => setStep(step => step + 1)

    const openDropdownModal = () => {
        setdropdownModal({
            open: true
        })
        //router.push("/meme/create");
    }

    const router = useRouter();

    const createMeme = () => {
        setdropdownModal({
            open: true
        })
        //router.push("/meme/create");
    }

    return (
        <div className="">
            <button onClick={() => openDropdownModal()} disabled={disabled} className='icon-btn-medium-tertiary lg:w-auto lg:btn-with-icon-medium-tertiary'>
                <img src="/assets/icons/create.svg" className='icon-md lg:icon-sm' />
                <span className='hidden lg:block'>Create new meme</span>
            </button>
            {dropdownModal.open && (<Dropdown setOpen={setdropdownModal} open={dropdownModal.open} setInitialImage={setInitialImage} goNext={goNext} />)}
        </div>
    )
}