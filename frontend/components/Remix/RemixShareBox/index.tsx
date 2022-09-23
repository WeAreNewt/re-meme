import { selectedEnvironment } from "../../../config/environments";
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";
import FileSaver from 'file-saver'
import { useState } from "react";

type RemixShareBoxProps = {
    publication: PublicationData
}

export const RemixShareBox: React.FC<RemixShareBoxProps> = ({ publication }) => {

    const memeUrl = parseIpfs(publication.metadata.media[0].original.url)

    const [imageHover, setImageHover] = useState(false)

    const onImageHoverOut = () => {
        setImageHover(false)
    }

    const handleShare = () => {
        const url = `${selectedEnvironment.appUrl}/meme/${publication.id}`
        navigator.clipboard.writeText(url)
        setImageHover(true)
    }

    const handleShareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20on-chain%20meme%20I%20found%20on%20re:meme:%20https://rememe.lol/${publication.id}`, "_blank")
    }

    const handleDownload = () => {
        FileSaver.saveAs(memeUrl, 'meme.jpeg')
    }

    return (
        <div className="main-container">
            <a target="_blank" rel="noreferrer" href={`${selectedEnvironment.lensterUrl}/posts/${publication.id}`} className="btn-medium-secondary no-underline hover:text-neutral-black w-full mb-[16px]">Comment on Lenster</a>
            <div className="flex justify-center gap-[12px]">
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
        </div>
    )
}