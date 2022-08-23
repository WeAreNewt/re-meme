import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";

interface RemixShareBoxProps {
    meme: PublicationData
}

export const RemixCreatedBox : React.FC<RemixShareBoxProps> = ({ meme }) => {

    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    const handleShareLenster = () => {

    }

    const socialIcons = [
        {
            src: "/assets/icons/share-icon.svg",
            handleClick: () => {
                const url =  `https://rememe.lol/${meme.id}`
                navigator.clipboard.writeText(url)
            }
        },
        {
            src: "/assets/icons/share-twitter.svg",
            handleClick: () => {
                window.open(`https://twitter.com/intent/tweet?text=Just%20made%20a%20meme%20on%20Lens%20with%20re:meme:%20https://rememe.lol/${meme.id}`, "_blank")
            }
        },
        {
            src: "/assets/icons/download.svg",
            handleClick: () => {
                const a = document.createElement('a')
                a.href = memeSrc
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
        <div className="main-container lg:w-2/5 bg-alert-green-30">
            <h3 className="text-subtitle-2 uppercase whitespace-pre-line text-center mb-[16px]">{"your meme is live!\nshare with your frens."}</h3>
            <button onClick={handleShareLenster} className="btn-medium-secondary w-full mb-[16px]">Share on lenster</button>
            <div className="flex justify-center gap-[12px] mb-[40px]">
                {
                    socialIcons.map((si, index) => (
                        <button key={"sicon-" + index} onClick={si.handleClick} className="icon-btn-medium-secondary">
                            <img className="icon-medium" src={si.src} />
                        </button>
                    ))
                }
            </div>
            <p className="text-description-bold mb-[8px]">Still felling funny?</p>
            <button onClick={handleRemixAgain} className="btn-small-tertiary">Remix Again</button>
        </div>
    )
}