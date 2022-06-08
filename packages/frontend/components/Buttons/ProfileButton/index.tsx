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
        router.push(`/profile/1`);
    }
        
    return (
        <button onClick={handleClick} disabled={disabled} className={`overflow-hidden flex items-center justify-center bg-lime border-3 border-black border-solid rounded-full w-12 h-12 ${disabled ? 'opacity-30' : 'comic-border-mini'}`} type="button">
            <img src={profilePicture} alt="avatar" />
        </button>
    )
}