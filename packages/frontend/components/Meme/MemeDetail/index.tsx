import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { PublicationData } from "../../../models/Publication/publication.model";
import { ProfileCard } from "../../ProfileCard";
import { RemixBtn } from "../../Remix/RemixBtn";
import { RemixCount } from "../../RemixCount";

type MemeDetailProps = {
    meme: PublicationData;
    inspired?: boolean;
}

export const parseIpfs = (url: string) => {
    if(url.startsWith('ipfs://')) {
        return url.replace('ipfs://', "https://ipfs.infura.io/ipfs/")
    }
    return url
}

export const MemeDetail = ({ meme, inspired }: MemeDetailProps) => {

    const { width } = useWindowDimensions();
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    const handleRemixClick = () => {

    }

    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl w-full lg:w-3/5">
            {
                inspired ?
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-bold mb-0">GET INSPIRED</p>
                    <RemixBtn btnText="Remix" onClick={handleRemixClick} disabled={disabled} className="comic-border-mini create-btn-gradient rounded-full px-4 text-lg font-bold" />
                </div>
                : null
            }
            <img src={memeSrc} className="w-full h-auto rounded-xl" width={ width > 850 ? "1600": "800" } height={ width > 850 ? "1000": "500"} />
            <div className="flex justify-between items-center n:mt-2 lg:mt-6">
                <ProfileCard profile={meme.profile} subText={new Date(meme.createdAt).toLocaleDateString('fr-CA')} />
                <RemixCount disabled={disabled} count={meme.stats.totalAmountOfComments} />
            </div>
        </div>
    )
}