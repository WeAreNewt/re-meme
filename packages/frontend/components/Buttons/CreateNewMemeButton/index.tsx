import Image from 'next/image';

type CreateNewMemeBtnProps = {
    disabled: boolean
}

export const CreateNewMemeBtn = ({disabled}: CreateNewMemeBtnProps) => {

    const createMeme = () => {

    }
    
    return (
        <button onClick={createMeme} disabled={disabled} className={"create-btn-gradient rounded-full border-black border-solid border-4 px-4 lg:px-20 py-2 " + (disabled ? "opacity-30" : "comic-border-mini" ) }>
            <div className='flex items-center space-x-3'>
                <Image src="/assets/icons/create.svg" width="20" height="20" />
                <span className='font-bold'>Create new meme</span>
            </div>
        </button>
    )
}