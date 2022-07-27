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
        <div className="flex flex-col space-y-6 comic-border bg-white n:p-4 lg:p-10 rounded-4xl text-center">
            <a target="_blank" rel="noreferrer" href={`https://testnet.lenster.xyz/posts/${publication.id}`} className="comic-border-mini rounded-full bg-white px-10 py-2 cursor-pointer text-black no-underline">Collect/comment on Lenster</a>
            <div className="flex justify-center space-x-4 mb-4">
                <div key={"sicon-share"} onClick={handleShare} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                    <Image src="/assets/icons/share-icon.svg" width="30" height="30" alt="share" />
                </div>
                <div key={"sicon-twitter-share"} onClick={handleShareTwitter} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                    <Image src="/assets/icons/share-twitter.svg" width="30" height="30" alt="share twitter" />
                </div>
                <a key={"sicon-download"} download="meme.svg" href={memeUrl} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                    <Image src="/assets/icons/download.svg" width="30" height="30" alt="download" />
                </a>
            </div>
        </div>
    )
}