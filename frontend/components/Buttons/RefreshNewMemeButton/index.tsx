export const RefreshNewMemeBtn = () => {

    const reloadMeme = () => {
       window.location.reload();
    }
    
    return (
        <button onClick={reloadMeme} className='icon-btn-medium lg:w-auto lg:btn-with-icon-medium'>
            <img src="/assets/icons/refresh.svg" className='icon-md lg:icon-sm' />
            <span className='hidden lg:block'>Refresh meme</span>
        </button>
    )
}