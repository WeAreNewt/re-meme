import { useRouter } from 'next/router';

export const RefreshNewMemeBtn = () => {
    const router = useRouter();

    const reloadMeme = () => {
       window.location.reload();
    }
    

    return (
        <button onClick={reloadMeme} className='lg:w-auto lg:btn-with-icon-medium'>
            <img src="/assets/icons/refresh.svg" className='hidden lg:icon-sm lg:block' />
            <span className='hidden lg:block'>Refresh meme</span>
        </button>
    )
}