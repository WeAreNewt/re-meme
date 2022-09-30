import moment from "moment";
import {  useMemo, useState } from "react";
import { useContract, useContractRead, useSigner } from "wagmi";
import useComments from "../../../lib/hooks/useComments";
import { PublicationData } from "../../../lib/models/Publication/publication.model";
import { parseIpfs } from "../../../lib/utils/link";
import Remixes from "../../Modals/Remixes";
import { ProfileCard } from "../../ProfileCard";
import { RemixCount } from "../../RemixCount";
import { ReportModal } from "../../Modals/ReportModal";
import { UpdateCollectButton } from "../../UpdateCollectButton";
import { FormData, UpdateCollectSettingsModal } from "../../../components/Modals/UpdateCollectSettings";
import { selectedEnvironment } from "../../../lib/config/environments";
import CollectModuleAbi from '../../../lib/utils/contracts/abis/UpdateOwnableFeeCollectModule.json'
import { RootState } from "../../../lib/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import reportImg from '../../../public/assets/icons/report.svg'
import { BigNumber } from "ethers";

type MemeDetailProps = {
    meme: PublicationData;
}

export const MemeDetail = ({ meme }: MemeDetailProps) => {
    const [remixesOpen, setRemixesOpen] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false);
    const { data: commentsPageData } = useComments(meme.id)
    const selectedProfile = useSelector((state: RootState) => state.user.selectedProfile);

    const memeSrc = parseIpfs(meme.metadata.media[0].original.url)

    const { data: signer } = useSigner()

    const pubId = meme.id.split('-')[1]

    const collectModuleContract = useContract({
        addressOrName: selectedEnvironment.collectModuleAddress,
        contractInterface: CollectModuleAbi,
        signerOrProvider: signer
    })

    const collectModuleSettings = useContractRead({
        addressOrName: selectedEnvironment.collectModuleAddress,
        contractInterface: CollectModuleAbi,
        functionName: 'getPublicationData',
        args: [selectedProfile?.id, pubId]
    })

    const [showCollectSettings, setShowCollectSettings] = useState(false)

    const handleUpdateSettings = () => {
        setShowCollectSettings(true);
    }

    const initialModuleData = useMemo(() => {
        if(collectModuleSettings.data) {
            const decodedData = collectModuleSettings.data
            return {
                amount: decodedData[1] as BigNumber,
                currency: decodedData[2] as string,
                recipient: decodedData[3] as string,
                referralFee: decodedData[4] as number,
                followerOnly: decodedData[5] as boolean
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

    return (
        <>
            <Remixes totalCount={commentsPageData?.publications.pageInfo.totalCount} remixes={commentsPageData?.publications.items} open={remixesOpen} setOpen={setRemixesOpen} />
            <div className="main-container lg:w-3/5">
                <div className="group relative w-full border-[1px] rounded-[12px] border-neutral-400 mb-[16px]">
                    <img src={memeSrc} className="w-full rounded-xl" alt="meme" />

                    <button onClick={() => setShowConfirm(true)} className={`btn-with-icon-small-secondary absolute top-3 right-3 hidden group-hover:flex w-auto`}>
                        <Image src={reportImg} className="icon-sm" alt="report button" />
                        <span>Report</span>
                    </button>
                </div>
                <div className="flex w-full justify-between items-center">
                    <ProfileCard profile={meme.profile} subText={moment(meme.createdAt).format('MMM Do YYYY')} />
                    <div className="flex gap-[16px]">
                        <RemixCount handleClick={() => setRemixesOpen(true)} count={commentsPageData?.publications.pageInfo.totalCount || 0} />
                        {
                            // enable when we want to add collect module
                            (selectedProfile?.id === meme.profile.id) && initialModuleData && (
                                <>
                                    <UpdateCollectButton onUpdateCollectClicked={handleUpdateSettings} />
                                    <UpdateCollectSettingsModal onSubmit={onSubmitModuleChanges} show={showCollectSettings} setShow={setShowCollectSettings} initialValues={initialModuleData} />
                                </>
                            )
                        }
                    </div>
                </div>
                <ReportModal show={showConfirm} setShow={setShowConfirm} memeid={meme.id}/>
            </div>
        </>
    )
}