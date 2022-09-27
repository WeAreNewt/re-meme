import Image from "next/image";
import { isNftImage, User } from "../../lib/models/User/user.model";
import { parseIpfs } from "../../lib/utils/link";

type ProfileCardProps = {
    profile: User;
    subText: string;
    selected?: boolean;
}

export const ProfileCard = ({profile, subText, selected}: ProfileCardProps) => {
    const profilePicture = profile.picture && !isNftImage(profile.picture) ? parseIpfs(profile.picture.original.url) : "/assets/icons/profile.svg"
    return (
        <div className="flex flex-row items-center overflow-hidden text-ellipsis flex-nowrap">
            <img src={profilePicture} alt="profile" className="w-10 h-10 rounded-full border-neutral-400 border-1"/>
            <div className="flex flex-col ml-2 mr-auto">
                <h3 className="text-description-bold -mb-0 text-ellipsis">{profile.name || profile.handle}</h3>
                <p className="text-neutral-600 text-description-regular mb-0">{subText}</p>
            </div>
            { 
                selected ? (
                    <div className="icon-btn-medium shadow-none bg-neutral-black active:bg-neutral-black hover:bg-neutral-black">
                        <img src="/assets/icons/ok.svg" className="icon-md" />
                    </div>
                )
                : null 
            }
        </div>
    )
}