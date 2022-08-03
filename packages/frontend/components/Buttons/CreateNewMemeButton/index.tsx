import Image from 'next/image';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../../hooks/window-dimensions.hook';

type CreateNewMemeBtnProps = {
    disabled: boolean
}

export const CreateNewMemeBtn = ({ disabled }: CreateNewMemeBtnProps) => {
    const { height, width } = useWindowDimensions();
    const router = useRouter();

    const createMeme = () => {
        router.push("/meme/create");
    }

    return (
        <button onClick={createMeme} disabled={disabled} className='icon-btn-create-meme lg:btn-create-meme'>
            <img src="/assets/icons/create.svg" className='icon lg:w-[20px] lg:h-[20px]' />
            <span className='hidden lg:block'>Create new meme</span>
        </button>
    )
}