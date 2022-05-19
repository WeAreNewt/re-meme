import Image from "next/image"

export const RemixShareBox = () => {
    // Recoger el estado del usuario

    const handleShareBean = () => {

    }

    const handleShareMemixer = () => {

    }

    const handleShareLenster = () => {

    }

    const socialIcons = [
        {
            src: "/assets/icons/share-icon.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/share-twitter.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/download.svg",
            handleClick: () => {

            }
        },
    ]

    return (
        <div className="flex flex-col space-y-6 comic-border bg-white p-10 rounded-4xl text-center">
            <button onClick={handleShareBean} className="comic-border-mini rounded-full bg-white px-20 py-2 text-base">Share on Bean</button>
            <div className="flex justify-center space-x-4 mb-4">
                {
                    socialIcons.map((si, index) => (
                        <div key={"sicon-"+index} onClick={si.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2">
                            <Image src={si.src} width="30" height="30" />
                        </div>
                    ))
                }
            </div>
            <button onClick={handleShareMemixer} className="comic-border-mini rounded-full bg-white px-20 py-2 text-base">See on Memixer</button>
            <button onClick={handleShareLenster} className="comic-border-mini rounded-full bg-white px-20 py-2 text-base">Share on Lenster</button>
        </div>
    )
}