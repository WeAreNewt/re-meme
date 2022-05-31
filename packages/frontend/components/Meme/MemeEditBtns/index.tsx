import Image from "next/image"

export const MemeEditBtns = () => {
    const memeControllBtns = [
        {
            src: "/assets/icons/edit-meme-1.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-2.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-3.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-4.svg",
            handleClick: () => {

            }
        }
    ]

    return (
        <div className="flex space-x-3 mb-4">
            {
                memeControllBtns.map((btn, i) => (
                    <div key={"mbicon-" + i} onClick={btn.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                        <Image src={btn.src} width="30" height="30" />
                    </div>
                ))
            }
        </div>
    )
}