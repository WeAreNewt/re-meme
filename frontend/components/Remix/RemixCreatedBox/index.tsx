import { selectedEnvironment } from "../../../lib/config/environments";
import { PublicationData } from "../../../lib/models/Publication/publication.model";
import { parseIpfs } from "../../../lib/utils/link";
import FileSaver from 'file-saver'
import { useRouter } from "next/router";

interface RemixShareBoxProps {
    meme: PublicationData
}

export const RemixCreatedBox : React.FC<RemixShareBoxProps> = ({ meme }) => {
    const router = useRouter()
    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    const handleShareLenster = () => {
        window.open(`${selectedEnvironment.lensterUrl}/posts/${meme.id}`, "_blank")
    }

    const socialIcons = [
        {
            src: "/assets/icons/share-icon.svg",
            handleClick: () => {
                const url =  `${selectedEnvironment.appUrl}/meme/${meme.id}`
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
                FileSaver.saveAs(memeSrc, 'meme.jpeg')
            }
        },
    ]

    const handleRemixAgain = () => {
        router.push(`/meme/${meme.id}/edit`)
    }

    return (
        <div className="main-container lg:w-2/5 bg-alert-green-30">
            <h3 className="text-subtitle-2 uppercase whitespace-pre-line text-center mb-[16px]">{"your meme is live!\nshare with your frens."}</h3>
            <button onClick={handleShareLenster} className="btn-medium-secondary w-full mb-[16px]">Share on Lenster</button>
            <div className="flex justify-center gap-[12px] mb-[40px]">
                {
                    socialIcons.map((si, index) => (
                        <button key={"sicon-" + index} onClick={si.handleClick} className="icon-btn-medium-secondary">
                            <img className="icon-medium" src={si.src} />
                        </button>
                    ))
                }
            </div>
            <p className="text-description-bold mb-[8px]">Still feeling funny?</p>
            <button onClick={handleRemixAgain} className="btn-small-tertiary">Remix Again</button>
        </div>
    )
}