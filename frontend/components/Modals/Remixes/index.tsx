import { PublicationData } from "../../../models/Publication/publication.model";
import { ProfileCard } from "../../ProfileCard";
import moment from 'moment'
import { useRouter } from "next/router";

interface RemixesProps {
    setOpen: (open: boolean) => void
    open: boolean
    remixes?: PublicationData[]
    totalCount?: number
}

const Remixes : React.FC<RemixesProps> = ({ setOpen, open, remixes = [], totalCount = 0 }) => {
    const router = useRouter();

    const onRemixClick = (remixId: string) => {
        setOpen(false)
        router.push(`${remixId}`)
    }

    return (
        <div
            onMouseDown={() => setOpen(false)}
            className={`${open ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center px-4 lg:px-0 top-0 left-0`}
        >
            <div
                className='main-container py-[24px] px-[20px] w-full max-w-[400px] max-h-[250px] overflow-y-hidden'
                onMouseDown={e => e.stopPropagation()}
            >
                <h2 className="text-subtitle-2 mb-[27px] w-full">{`${totalCount} REMIXES`}</h2>
                <div className="flex flex-col gap-4 overflow-auto max-h-[150px] no-scrollbar p-1 w-full">
                    {
                        remixes.map(remix => (
                            <div key={remix.id} className="flex w-full justify-between items-center">
                                <ProfileCard profile={remix.profile} subText={moment(remix.createdAt).format('MMM Do YYYY')} />
                                <button onClick={() => onRemixClick(remix.id)} key={"sicon-" + remix.id} className="icon-btn-medium-secondary">
                                    <img src="/assets/icons/right-arrow.svg" alt="left arrow" />
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Remixes;
