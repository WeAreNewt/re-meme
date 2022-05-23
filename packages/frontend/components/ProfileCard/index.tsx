import Image from "next/image";
import { User } from "../../models/User/user.model";

type ProfileCardProps = {
    profile: User;
    subText: string;
    selected?: boolean;
}

export const ProfileCard = ({profile, subText, selected}: ProfileCardProps) => {
    return (
        <div className="flex flex-row items-center">
            {/* <img src={profile.profilePic} className="w-12 h-auto" /> */}
            <Image src={profile.coverPicture?.uri || "/assets/icons/profile.svg"} className="w-12 h-auto" width="48" height="40" />
            <div className="flex flex-col ml-2 mr-auto">
                <h3 className="text-xs -mb-0">{profile.name}</h3>
                <p className="text-gray-500 text-xs mb-0">{subText}</p>
            </div>
            { 
                selected ? 
                    <Image src="/assets/icons/ok.svg" width="50" height="50" />
                : null 
            }
        </div>
    )
}