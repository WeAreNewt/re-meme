import Image from 'next/image';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../../hooks/window-dimensions.hook';

type CreateNewMemeBtnProps = {
    disabled: boolean
}

export const CreateNewMemeBtn = ({ disabled }: CreateNewMemeBtnProps) => {
    const router = useRouter();

    const createMeme = () => {
        router.push("/meme/create");
    }

    return (
        <button onClick={createMeme} disabled={disabled} className='icon-btn-medium-tertiary lg:w-auto lg:btn-with-icon-medium-tertiary'>
            <img src="/assets/icons/create.svg" className='icon-md lg:icon-sm' />
            <span className='hidden lg:block'>Create new meme</span>
        </button>
    )
}