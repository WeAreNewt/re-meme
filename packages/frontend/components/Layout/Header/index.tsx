import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'
import { User } from '../../../models/User/user.model'
import { removeUser, setUser } from '../../../store/reducers/user.reducer'
import { CreateNewMemeBtn } from '../../Buttons/CreateNewMemeButton'
import { CustomConnectButton } from '../../Buttons/CustomConnectButton/index'
import { ProfileButton } from '../../Buttons/ProfileButton'
import { SelectProfile } from '../../Modals/SelectProfile'

export const Header: React.FC<{}> = ({ }) => {
    const { data } = useAccount();
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log(data)
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
            <nav className="flex w-full p-12">
                <Link href="/">
                    <Image className="cursor-pointer" src="/logo.svg" alt="me" width="188.5" height="60.1" />
                </Link>
                <div className='flex ml-auto h-12 space-x-5'>
                    <CreateNewMemeBtn disabled={disabled} />
                    <CustomConnectButton onSuccessfullyConnected={handleConnected} />
                    <ProfileButton disabled={disabled} />
                    <button onClick={() => {setShow(!show)}}>Test me</button>
                </div>
            </nav>
        </>
    )
}