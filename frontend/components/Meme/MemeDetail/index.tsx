import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import useComments from "../../../hooks/useComments";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { PublicationData } from "../../../models/Publication/publication.model";
import { parseIpfs } from "../../../utils/link";
import Remixes from "../../Modals/Remixes";
import { ProfileCard } from "../../ProfileCard";
import { RemixCount } from "../../RemixCount";
import { ReportModal } from "../../Modals/ReportModal";
import { UpdateCollectButton } from "../../UpdateCollectButton";
import { FormData, UpdateCollectSettingsModal } from "../../../components/Modals/UpdateCollectSettings";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User } from "../../../models/User/user.model";
import { BigNumber, ethers } from "ethers";
import { selectedEnvironment } from "../../../config/environments";
import CollectModuleAbi from '../../../utils/contracts/abis/UpdateOwnableFeeCollectModule.json'

type MemeDetailProps = {
    meme: PublicationData;
    inspired?: boolean;
}

export const MemeDetail = ({ meme, inspired }: MemeDetailProps) => {
    const router = useRouter()
    const data  = useAccount();
    const [disabled, setDisabled] = useState(false);
    const [remixesOpen, setRemixesOpen] = useState(false)
    const [imageHover, setImageHover] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false);
    const { data: commentsPageData } = useComments(meme.id)

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    const handleRemixClick = () => {
        router.push(`/meme/${meme.id}/edit`)
    }

    const onImageHover = () => {
        setImageHover(true)
    }

    const onImageHoverOut = () => {
        setImageHover(false)
    }

    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    /*

    Waiting for the lens api to be ready

    const { data: signer } = useSigner()
    const user = useSelector<RootState, User | null>(state => state.user.selectedUser)

    const pubId = meme.id.split('-')[1]

    const collectModuleContract = useContract({
        addressOrName: selectedEnvironment.collectModuleAddress,
        contractInterface: CollectModuleAbi,
        signerOrProvider: signer
    })

    const collectModuleSettings = useContractRead({
        addressOrName: selectedEnvironment.collectModuleAddress,
        contractInterface: CollectModuleAbi}, 'getPublicationData', { args: [user?.id, pubId]
    })

    const [showCollectSettings, setShowCollectSettings] = useState(false)

    const handleUpdateSettings = () => {
        setShowCollectSettings(true);
    }

    const initialModuleData = useMemo(() => {
        if(collectModuleSettings.data) {
            const decodedData = collectModuleSettings.data
            return {
                amount: decodedData[1],
                currency: decodedData[2],
                recipient: decodedData[3],
                referralFee: decodedData[4],
                followerOnly: decodedData[5]
            }
        }
    }, [collectModuleSettings])

    const onSubmitModuleChanges = async (formData: FormData) => {
        const pubId = meme.id.split('-')[1]
        const tx = await collectModuleContract["updateModuleParameters"](meme.profile.id, pubId, formData.amount, formData.currency, formData.recipient, formData.referralFee, formData.followerOnly)
        tx.wait(1).then(() => {
            setShowCollectSettings(false)
        })
    }
    */

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
                <div className="relative w-full border-[1px] rounded-[12px] border-neutral-400 mb-[16px]">
                    <img src={memeSrc} onMouseOver={onImageHover} onMouseOut={onImageHoverOut} className="w-full rounded-xl" />

                    <button onClick={() => setShowConfirm(true)} onMouseOver={onImageHover} className={`btn-with-icon-small-secondary ${imageHover ? "!opacity-100" : "opacity-0" } absolute top-3 right-3`}>
                        <img src="/assets/icons/report.svg" className="icon-sm" />
                        <span>Report</span>
                    </button>
                </div>
                <div className="flex w-full justify-between items-center">
                    <ProfileCard profile={meme.profile} subText={moment(meme.createdAt).format('MMM Do YYYY')} />
                    <div className="flex gap-[16px]">
                        <RemixCount handleClick={() => setRemixesOpen(true)} count={commentsPageData?.publications.pageInfo.totalCount || 0} />
                        {
                            /*
                            Waiting for the lens api to be ready
                            user?.id === meme.profile.id && initialModuleData && (
                                <>
                                    <UpdateCollectButton onUpdateCollectClicked={handleUpdateSettings} />
                                    <UpdateCollectSettingsModal onSubmit={onSubmitModuleChanges} show={showCollectSettings} setShow={setShowCollectSettings} initialValues={initialModuleData} />
                                </>
                            )
                            */
                        }
                    </div>
                </div>
                <ReportModal show={showConfirm} setShow={setShowConfirm} memeid={meme.id}/>
            </div>
        </>
    )
}