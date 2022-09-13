import { useRouter } from 'next/router';
import { useRandomMeme } from "../../../hooks/useMeme";

export const RefreshNewMemeBtn = () => {
    const { refetch, loading } = useRandomMeme()
    const router = useRouter();

    const reloadMeme = () => {
       // window.location.reload();
    }
    

    return (
        <button onClick={refetch} className='lg:w-auto lg:btn-with-icon-medium'>
            <img src="/assets/icons/refresh.svg" className='hidden lg:icon-sm lg:block' />
            <span className='hidden lg:block'>Refresh meme</span>
        </button>
    )
}