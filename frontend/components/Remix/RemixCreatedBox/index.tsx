import { selectedEnvironment } from "../../../config/environments";
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";
import FileSaver from 'file-saver'
import { useRouter } from "next/router";
import { useState } from "react";

interface RemixShareBoxProps {
    meme: PublicationData
}

export const RemixCreatedBox: React.FC<RemixShareBoxProps> = ({ meme }) => {
    const router = useRouter()
    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)
    const [imageHover, setImageHover] = useState(false)

    const handleShareLenster = () => {
        window.open(`${selectedEnvironment.lensterUrl}/posts/${meme.id}`, "_blank")
    }

    const handleRemixAgain = () => {
        router.push(`/meme/${meme.id}/edit`)
    }

    const onImageHoverOut = () => {
        setImageHover(false)
    }

    const handleShare = () => {
        const url = `${selectedEnvironment.appUrl}/meme/${meme.id}`
        navigator.clipboard.writeText(url)
        setImageHover(true)
    }

    const handleShareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=Just%20made%20a%20meme%20on%20Lens%20with%20re:meme:%20https://rememe.lol/${meme.id}`, "_blank")
    }

    const handleDownload = () => {
        FileSaver.saveAs(memeSrc, 'meme.jpeg')
    }

    return (
        <div className="main-container lg:w-2/5 bg-alert-green-30">
            <h3 className="text-subtitle-2 uppercase whitespace-pre-line text-center mb-[16px]">{"your meme is live!\nshare with your frens."}</h3>
            <button onClick={handleShareLenster} className="btn-medium-secondary w-full mb-[16px]">Share on Lenster</button>

            <div className="flex justify-center gap-[12px] mb-[40px]">
                <div key={"sicon-share"} onClick={handleShare} onMouseOut={onImageHoverOut} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/share-icon.svg" alt="share" />
                    {imageHover && <div className={`rounded-[31px] bg-black text-white items-center p-1 ${imageHover ? "!opacity-100" : "opacity-0"} absolute -top-11 `}>
                        <span className="mr-4 ml-4">Copied!</span>
                    </div>}
                </div>
                <div key={"sicon-twitter-share"} onClick={handleShareTwitter} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/share-twitter.svg" width="30" height="30" alt="share twitter" />
                </div>
                <div key={"sicon-download"} onClick={handleDownload} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/download.svg" width="30" height="30" alt="download" />
                </div>
            </div>
            <p className="text-description-bold mb-[8px]">Still feeling funny?</p>
            <button onClick={handleRemixAgain} className="btn-small-tertiary">Remix Again</button>
        </div>
    )
}