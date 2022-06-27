import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'
import useWindowDimensions from '../../../hooks/window-dimensions.hook'
import { User } from '../../../models/User/user.model'
import { removeUser, setUser } from '../../../store/reducers/user.reducer'
import { CreateNewMemeBtn } from '../../Buttons/CreateNewMemeButton'
import { CustomConnectButton } from '../../Buttons/CustomConnectButton/index'
import { ProfileButton } from '../../Buttons/ProfileButton'
import { SelectProfile } from '../../Modals/SelectProfile'

export const Header: React.FC<{}> = ({ }) => {
    const { height, width } = useWindowDimensions();
    const { data } = useAccount();
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setDisabled(!data ? true : false)
        if (!data) {
            dispatch(removeUser());
        }
    }, [data])

    const handleCreateClick = () => {

    }

    const handleProfileSelected = (profile: User) => {
        dispatch(setUser(profile));
        setShow(false);
    }

    const handleConnected = () => {
        if (!show ) { //&& !selected
            setShow(true)
        }
    }

    return (
        <>
            <SelectProfile onClose={() => { setShow(false) }} onProfileSelected={handleProfileSelected} show={show} />
            <nav className="flex w-full p-4 sm:p-4 lg:p-12">
                <Link href="/">
                    <Image className="cursor-pointer w-1/2 h-auto" src="/logo.svg" alt="me" width={width > 850 ? "188.5": "120.25"} height={width > 850 ? "60.1" : "40.5"} />
                </Link>
                <div className='flex ml-auto h-12 space-x-5'>
                    <CreateNewMemeBtn disabled={disabled} />
                    <CustomConnectButton onSuccessfullyConnected={handleConnected} />
                    <ProfileButton disabled={disabled} />
                    {/* <button onClick={() => {setShow(!show)}}>Test me</button> */}
                </div>
            </nav>
        </>
    )
}