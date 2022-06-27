import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import useLensProfiles from '../../../hooks/useLensProfiles'
import useWindowDimensions from '../../../hooks/window-dimensions.hook'
import { User } from '../../../models/User/user.model'
import { removeUser, setUser } from '../../../store/reducers/user.reducer'
import { CreateNewMemeBtn } from '../../Buttons/CreateNewMemeButton'
import { CustomConnectButton } from '../../Buttons/CustomConnectButton/index'
import { ProfileButton } from '../../Buttons/ProfileButton'
import { SelectProfile } from '../../Modals/SelectProfile'

export const Header: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    const { data } = useAccount();
    const [show, setShow] = useState(false);
    const user: User = useSelector((state: any) => state.user.selectedUser);
    const dispatch = useDispatch();

    const { data: profilesData } = useLensProfiles()

    const handleProfileSelected = (profile: User) => {
        dispatch(setUser(profile));
        setShow(false);
    }

    useEffect(() => {
        if(data && profilesData && !user) {
            setShow(true)
        }
    }, [profilesData, user, data])

    useEffect(() => {
        if(!data) dispatch(removeUser())
    }, [data, dispatch])

    return (
        <>
            <SelectProfile onClose={() => { setShow(false) }} onProfileSelected={handleProfileSelected} show={show} />
            <nav className="flex w-full p-4 sm:p-4 lg:p-12">
                <Link href="/">
                    <Image className="cursor-pointer w-1/2 h-auto" src="/logo.svg" alt="me" width={width > 850 ? "188.5": "120.25"} height={width > 850 ? "60.1" : "40.5"} />
                </Link>
                <div className='flex ml-auto h-12 space-x-5'>
                    <CreateNewMemeBtn disabled={!user} />
                    <CustomConnectButton />
                    <ProfileButton disabled={!user} />
                </div>
            </nav>
        </>
    )
}