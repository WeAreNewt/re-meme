import Image from 'next/image';
import { useAccount } from 'wagmi';

export const CreateNewMemeBtn = () => {
    const { data } = useAccount();

    const createMeme = () => {

    }
    
    return (
        <button onClick={createMeme} disabled={!data}  className={"create-btn-gradient rounded-full border-black border-solid border-4 px-16 sm:px-16 lg:px-20 py-2 " + (data ? "" : "opacity-30" ) }>
            <div className='flex items-center space-x-3'>
                <Image src="/assets/icons/create.svg" width="20" height="20" />
                <span>Create new meme</span>
            </div>
        </button>
    )
}