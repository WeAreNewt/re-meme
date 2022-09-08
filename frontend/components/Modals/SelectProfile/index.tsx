import { useState } from "react";
import Marquee from "react-fast-marquee";
import useLensProfiles from "../../../hooks/useLensProfiles";
import { User } from "../../../models/User/user.model";
import { ProfileCard } from "../../ProfileCard";

type SelectProfileProps = {
    show: boolean;
    onClose: () => void
    onProfileSelected: (profile: User) => void
}

export const SelectProfile = ({ show, onClose, onProfileSelected }: SelectProfileProps) => {
    const [selectedProfile, setSelectedProfile] = useState<User>();
    const { data, loading } = useLensProfiles()

    const handleSelected = () => {
        if(selectedProfile) onProfileSelected(selectedProfile);
    }

    const handleProfileSelected = (profile) => {
        setSelectedProfile(profile);
    }

    const haveProfiles = !loading && data?.profiles.items.length

    return (
        <div className={show ? "block" : "hidden"}>
            <div className="absolute h-screen w-screen z-20 flex items-center justify-center bg-gradient-default-transparent px-4 lg:px-0">
                <div className="max-w-[492px]">
                    {
                        !haveProfiles && (
                            <Marquee direction="left" speed={175} play gradient={false} className="bg-lens-default rounded-[100px] comic-border mb-4 p-3">
                                <span className="text-xl font-bold">
                                    { "YOU DON'T HAVE A LENS HANDLE." }
                                </span>
                            </Marquee>
                        )
                    }
                    <div className="main-container">
                        { !!haveProfiles && <p className="text-subtitle-1 text-center mb-[43px]">{"Which Lens profile do\n you want to connect?"}</p> }
                        { !haveProfiles && <p className="text-center">{"Visit claim.lens.xyz to see if you're eligible to claim."}</p>}
                        {
                            data?.profiles.items.map((prof, index) => (
                                <div key={"profile-select-" + index} onClick={() => {handleProfileSelected(prof)}} className="border-b-[1px] border-neutral-400 border-solid pb-2 mb-2 cursor-pointer w-full">
                                    <ProfileCard profile={prof} subText={`${(prof.stats.publicationsTotal || 0) + (prof.stats.commentsTotal || 0)} memes created`} selected={selectedProfile === prof} />
                                </div>
                            ))
                        }
                        <div className="flex justify-center items-center gap-[24px] mt-[40px]">
                            <button onClick={onClose} className="btn-medium-secondary">Cancel</button>
                            <button disabled={!selectedProfile} onClick={handleSelected} className="btn-medium">Select</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}