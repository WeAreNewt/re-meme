import Image from "next/image"
import { RemixBtn } from "../RemixBtn";

type RemixShareBoxProps = {
    meme: any; //Meme
}

export const RemixCreatedBox = ({ meme }: RemixShareBoxProps) => {

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
                const a = document.createElement('a')
                a.href = meme.src
                a.download = 'meme.svg'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        },
    ]

    const handleRemixAgain = () => {
    }

    return (
        <div className="flex flex-col space-y-4 comic-border bg-light-green n:p-4 lg:p-10 rounded-4xl text-center w-full lg:w-3/4">
            <h3 className="text-xl font-extrabold uppercase whitespace-pre-line">{"your meme is live!\nshare with your frens."}</h3>
            <button onClick={handleShareLenster} className="comic-border-mini rounded-full bg-white px-2 lg:px-20 py-1 lg:py-2 text-base font-medium">Share on lenster</button>
            <div className="flex justify-center space-x-4 lg:mb-4">
                {
                    socialIcons.map((si, index) => (
                        <div key={"sicon-" + index} onClick={si.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                            <Image src={si.src} width="25" height="25" />
                        </div>
                    ))
                }
            </div>
            <div>
                <p className="font-medium mt-4 mb-2 text-xs">Still felling funny?</p>
                <RemixBtn disabled={false} onClick={handleRemixAgain} btnText="Remix again" className="mx-auto create-btn-gradient rounded-full border-black border-solid border-3 px-4 lg:px-3 max-w-max text-lg font-medium " />
            </div>
        </div>
    )
}