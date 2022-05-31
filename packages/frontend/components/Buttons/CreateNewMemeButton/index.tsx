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
        <button onClick={createMeme} disabled={disabled} className={"create-btn-gradient rounded-full border-black border-solid border-3 px-2 sm:px-4 lg:px-20 sm:py-2 " + (disabled ? "opacity-30" : "comic-border-mini")}>
            <div className='flex items-center sm:space-x-0 md:space-x-3'>
                <Image src="/assets/icons/create.svg" className='w-full' width={width > 850 ? "20" : "24"} height={width > 850 ? "20" : "24"} />
                {
                    width > 850 ? <span className='font-bold'>Create new meme</span>
                        : null
                }
            </div>
        </button>
    )
}