import Image from "next/image"
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";

type RemixShareBoxProps = {
    publication: PublicationData; //Meme
}

export const RemixShareBox : React.FC<RemixShareBoxProps> = ({ publication }) => {

    const memeUrl = parseIpfs(publication.metadata.media[0].original.url)

    const handleShare = () => {

    }

    const handleShareTwitter = () => {

    }

    const handleDownload = () => {

    }

    return (
        <div className="main-container">
            <a target="_blank" rel="noreferrer" href={`https://testnet.lenster.xyz/posts/${publication.id}`} className="btn-medium-secondary no-underline hover:text-neutral-black w-full mb-[16px]">Collect/comment on Lenster</a>
            <div className="flex justify-center gap-[12px]">
                <div key={"sicon-share"} onClick={handleShare} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/share-icon.svg" alt="share" />
                </div>
                <div key={"sicon-twitter-share"} onClick={handleShareTwitter} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/share-twitter.svg" width="30" height="30" alt="share twitter" />
                </div>
                <a key={"sicon-download"} download="meme.svg" href={memeUrl} className="icon-btn-medium-secondary">
                    <img className="icon-md" src="/assets/icons/download.svg" width="30" height="30" alt="download" />
                </a>
            </div>
        </div>
    )
}