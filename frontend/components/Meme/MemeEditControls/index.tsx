import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type MemeEditControlsProps = {
    onRemixClicked: () => void;
}

interface MemixerText {
    value: string
    font: string
    fontColor: string
    shadowColor: string
    size: number
}

const defaultMemixerText = {
    value: '',
    font: '',
    fontColor: '#FFFFFF',
    shadowColor: '#000000',
    size: 20
}

export const MemeEditControls = ({onRemixClicked}: MemeEditControlsProps) => {
    const data = useAccount();
    const [disabled, setDisabled] = useState(false);
    const [ texts, setTexts ] = useState<MemixerText[]>([defaultMemixerText])

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    const memeControllBtns = [
        {
            src: "/assets/icons/edit-meme-1.svg",
            handleClick: () => {
                setTexts(texts => texts.concat([defaultMemixerText]))
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

    const handleMemeText = (e, index) => {
        const selectedMemixerText = texts[index]
        const newMemixerText = { ...selectedMemixerText, value: e.target.value}
        const newTexts = texts.slice()
        newTexts[index] = newMemixerText
        setTexts(newTexts)
    }

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full">
            <p className="text-lg font-bold">RE:MEME CONTROLS</p>
            {
                texts.map((text, index) =>
                    <input
                        onChange={e => handleMemeText(e, index)}
                        className="border-2 border-black border-solid rounded-xl p-2 w-4/5 mb-4"
                        placeholder={`Text #${index + 1}`}
                        key={`memixer_text_${index}`}
                        value={text.value}
                    />)
            }
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
