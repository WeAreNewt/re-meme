import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { ProfileCard } from "../../ProfileCard";
import { RemixBtn } from "../../Remix/RemixBtn";
import { RemixCount } from "../../RemixCount";
import { UpdateCollectButton } from "../../UpdateCollectButton";
import { UpdateCollectSettingsModal } from "../../../components/Modals/UpdateCollectSettings";


type MemeDetailProps = {
    meme?: any;
    inspired?: boolean;
}

export const MemeDetail = ({ meme, inspired }: MemeDetailProps) => {
    const { height, width } = useWindowDimensions();
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleUpdateSettings = () => {
        setShowConfirm(true);
    }

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    const handleRemixClick = () => {

    }

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl">
            {
                inspired ?
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-bold mb-0">GET INSPIRED</p>
                    <RemixBtn btnText="Remix" onClick={handleRemixClick} disabled={disabled} className="comic-border-mini create-btn-gradient rounded-full px-4 text-lg font-bold" />
                </div>
                : null
            }
            <Image src={meme.src} className="w-full h-auto rounded-xl" width={ width > 850 ? "1600": "800" } height={ width > 850 ? "1000": "500"} />
            <div className="flex justify-between items-center n:mt-2 lg:mt-6">
                <ProfileCard profile={meme.mockProfile} subText={new Date(meme.publicationDate).toLocaleDateString('fr-CA')} />
                <RemixCount disabled={disabled} count={meme.remixCount} />
                <UpdateCollectButton onUpdateCollectClicked={handleUpdateSettings} disabled={false} />
                <UpdateCollectSettingsModal show={showConfirm} setShow={setShowConfirm} />
            </div>
        </div>
    )
}