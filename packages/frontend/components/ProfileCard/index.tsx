import Image from "next/image";

type ProfileCardProps = {
    profile: any;
    date: Date;
}

export const ProfileCard = ({profile, date}: ProfileCardProps) => {
    return (
        <div className="flex space-x-2">
            <Image src={profile.profilePic} className="w-12 h-10" width="40" height="20" />
            <div className="flex flex-col">
                <h3 className="text-xs">{profile.username}</h3>
                <p className="text-gray-500 text-xs">{date.toLocaleDateString('fr-CA')}</p>
            </div>
        </div>
    )
}