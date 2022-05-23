import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../../models/User/user.model';


type ProfileButtonProps = {
    disabled: boolean
}

export const ProfileButton = ({disabled}: ProfileButtonProps) => {
    const user: User = useSelector((state: any) => state.user.selectedUser);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/profile/${user.id}`);
    }

    useEffect(() => {
        console.log(user)
    }, [user])
    
        
    return (
        <button onClick={handleClick} disabled={disabled} className={"flex items-center bg-lime border-4 border-black border-solid rounded-full " + (disabled ? "opacity-30 " : "comic-border-mini ") + (user.name ? "" : "p-2") } type="button">
            {
                user?.coverPicture?.uri ?
                <Image src={user?.coverPicture?.uri || "/assets/icons/profile.svg"} width="48" height="48" />
                :
                <Image src={user?.coverPicture?.uri || "/assets/icons/profile.svg"} width="24" height="24" />
            }
        </button>
    )
}