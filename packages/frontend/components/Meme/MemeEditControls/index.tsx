import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type MemeEditControlsProps = {
    onRemixClicked: () => void;
}

export const MemeEditControls = ({onRemixClicked}: MemeEditControlsProps) => {
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

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

    const handleMemeText = (event) => {

    }

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full h-full lg:h-1/2">
            <p className="text-lg font-bold">MEMIXER CONTROLS</p>
            <input onChange={handleMemeText} className="border-2 border-black border-solid rounded-xl p-2 w-4/5 mb-4" placeholder="Text #1" type="text" />
            <div className="flex space-x-3 mb-4">
                {
                    memeControllBtns.map((btn, i) => (
                        <div key={"mbicon-" + i} onClick={btn.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                            <Image src={btn.src} width="30" height="30" />
                        </div>
                    ))
                }
            </div>
            <button onClick={onRemixClicked} disabled={disabled} className={"create-btn-gradient rounded-full border-black border-solid border-3 px-16 sm:px-16 lg:px-20 py-3 text-lg font-bold absolute -bottom-10 " + (disabled ? "opacity-30" : "comic-border-mini")}>
                REMIX
            </button>
        </div>
    )
}