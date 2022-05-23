import Image from "next/image"
import { Router, useRouter } from "next/router";
import { RemixBtn } from "../RemixBtn";

type RemixShareBoxProps = {
    meme: any; //Meme
}

export const RemixShareBox = ({ meme }: RemixShareBoxProps) => {

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
            <button onClick={handleShareBean} className="comic-border-mini rounded-full bg-white px-20 py-2">Share on Bean</button>
            <div className="flex justify-center space-x-4 mb-4">
                {
                    socialIcons.map((si, index) => (
                        <div key={"sicon-"+index} onClick={si.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                            <Image src={si.src} width="30" height="30" />
                        </div>
                    ))
                }
            </div>
            <button onClick={handleShareMemixer} className="comic-border-mini rounded-full bg-white px-20 py-2 font-medium">See on Memixer</button>
            <button onClick={handleShareLenster} className="comic-border-mini rounded-full bg-white px-20 py-2 font-medium">Share on Lenster</button>
        </div>
    )
}