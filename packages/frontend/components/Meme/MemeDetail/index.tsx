import moment from "moment";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useComments from "../../../hooks/useComments";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";
import Remixes from "../../Modals/Remixes";
import { ProfileCard } from "../../ProfileCard";
import { RemixCount } from "../../RemixCount";

type MemeDetailProps = {
    meme: PublicationData;
    inspired?: boolean;
}

export const MemeDetail = ({ meme, inspired }: MemeDetailProps) => {

    const { width } = useWindowDimensions();
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);
    const [remixesOpen, setRemixesOpen] = useState(false)

    const { data: commentsPageData } = useComments(meme.id)

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    const handleRemixClick = () => {

    }

    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    return (
        <>
            <Remixes totalCount={commentsPageData?.publications.pageInfo.totalCount} remixes={commentsPageData?.publications.items} open={remixesOpen} setOpen={setRemixesOpen} />
            <div className="main-container lg:w-3/5">
                {
                    inspired ?
                    <div className="flex justify-between w-full items-center mb-[16px]">
                        <p className="text-subtitle-2 mb-0">GET INSPIRED</p>
                        <button onClick={handleRemixClick} disabled={disabled} className="btn-small-tertiary">Remix</button>
                    </div>
                    : null
                }
                <img src={memeSrc} className="w-full rounded-xl mb-[16px]" />
                <div className="flex w-full justify-between items-center">
                    <ProfileCard profile={meme.profile} subText={moment(meme.createdAt).format('MMM Do YYYY')} />
                    <RemixCount handleClick={() => setRemixesOpen(true)} count={commentsPageData?.publications.pageInfo.totalCount || 0} />
                </div>
            </div>
        </>
    )
}