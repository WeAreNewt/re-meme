import { selectedEnvironment } from "../../../config/environments";
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";
import FileSaver from 'file-saver'

type RemixShareBoxProps = {
    publication: PublicationData
}

export const RemixShareBox : React.FC<RemixShareBoxProps> = ({ publication }) => {

    const memeUrl = parseIpfs(publication.metadata.media[0].original.url)

    const handleShare = () => {
        const url =  `${selectedEnvironment.appUrl}/meme/${publication.id}`
        navigator.clipboard.writeText(url)
    }

    const handleShareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=Just%20made%20a%20meme%20on%20Lens%20with%20re:meme:%20https://rememe.lol/${publication.id}`, "_blank")
    }

    const handleDownload = () => {
        FileSaver.saveAs(memeUrl, 'meme.svg')
    }

    return (
        <div className="main-container">
            <a target="_blank" rel="noreferrer" href={`${selectedEnvironment.lensterUrl}/posts/${publication.id}`} className="btn-medium-secondary no-underline hover:text-neutral-black w-full mb-[16px]">Collect/comment on Lenster</a>
            <div className="flex justify-center gap-[12px]">
                <div key={"sicon-share"} onClick={handleShare} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/share-icon.svg" alt="share" />
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