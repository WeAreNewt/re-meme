import Image from "next/image";
import { useState } from "react";

type MemeEditPreviewProps = {
    meme: any; //Meme
}

export const MemeEditPreview = ({ meme }: MemeEditPreviewProps) => {
    const [show, setShow] = useState(false);

    const imageControllBtns = [
        {
            src: "/assets/icons/edit-meme-1.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-2.svg",
            handleClick: () => {

            }
        }
    ]

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative" onMouseEnter={() => { setShow(true) }} onMouseLeave={() => { setShow(false) }}>
            {
                show ?
                    <div className="flex absolute right-14 top-14 space-x-3">
                        {
                            imageControllBtns.map((btn, i) => (
                                <div key={"ibicon-" + i} onClick={btn.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                                    <Image src={btn.src} width="25" height="25" />
                                </div>
                            ))
                        }
                    </div>
                    : null
            }
            <Image src={meme.src} className="w-full h-auto rounded-xl" width="1600" height="1000" />
        </div>
    )
}