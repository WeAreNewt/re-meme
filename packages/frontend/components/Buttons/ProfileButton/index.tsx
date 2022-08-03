import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isNftImage } from '../../../models/User/user.model';
import { RootState } from '../../../store/store';


type ProfileButtonProps = {
    disabled: boolean
}

export const ProfileButton = ({disabled}: ProfileButtonProps) => {
    const user = useSelector((state: RootState) => state.user.selectedUser);
    const router = useRouter();

    const profilePicture = user?.picture && !isNftImage(user.picture) ? user.picture.original.url : "/assets/icons/profile.svg"

    const handleClick = () => {
        // disabled for now
        // router.push(`/profile`);
    }
        
    return (
        <button onClick={handleClick} disabled={disabled} className="icon-btn p-0 overflow-hidden bg-lens-default" type="button">
            <img src={profilePicture} alt="avatar" className="w-full h-full" />
        </button>
    )
}