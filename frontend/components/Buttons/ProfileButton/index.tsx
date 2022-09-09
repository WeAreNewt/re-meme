import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isNftImage } from '../../../models/User/user.model';
import { RootState } from '../../../store/store';
import { parseIpfs } from '../../../utils/link';


type ProfileButtonProps = {
    disabled: boolean
}

export const ProfileButton = ({disabled}: ProfileButtonProps) => {
    const user = useSelector((state: RootState) => state.user.selectedUser);
    const router = useRouter();

    const profilePicture = user?.picture && !isNftImage(user.picture) && parseIpfs(user.picture.original.url)

    const handleClick = () => {
        router.push(`/profile`);
    }
        
    return (
        <button disabled={disabled} className="icon-btn-medium p-0 overflow-hidden disabled:bg-lens-default bg-lens-default hover:bg-lens-default active:bg-lens-default shadow-none cursor-default" type="button">
            <img src={profilePicture ? profilePicture : "/assets/icons/profile.svg"} alt="avatar" className={ `${profilePicture ? "w-full h-full cursor-default" : "icon-md"} ` } />
        </button>
    )
}