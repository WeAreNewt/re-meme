import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import useLensAuth from '../../../lib/hooks/useLensAuth'
import useLensProfiles from '../../../lib/hooks/useLensProfiles'
import useWindowDimensions from '../../../lib/hooks/window-dimensions.hook'
import { User } from '../../../lib/models/User/user.model'
import { CreateNewMemeBtn } from '../../Buttons/CreateNewMemeButton'
import { RefreshNewMemeBtn } from '../../Buttons/RefreshNewMemeButton'
import { CustomConnectButton } from '../../Buttons/CustomConnectButton/index'
import { ProfileButton } from '../../Buttons/ProfileButton'
import { SelectProfile } from '../../Modals/SelectProfile'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../lib/redux/store'
import { useDispatch } from 'react-redux'
import { removeSelectedProfile, setSelectedProfile } from '../../../lib/redux/slices/user'
import { deleteTokens } from '../../../lib/redux/slices/auth'

export const Header: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    const { data: account } = useAccount();
    const [show, setShow] = useState(false);
    const selectedProfile = useSelector((state: RootState) => state.user.selectedProfile)
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    useLensAuth(account?.address)

    const { data: profilesData } = useLensProfiles()

    const reloadPage = () => {
        if(router.pathname === '/'){
            window.location.reload();
        }
     }

    const handleProfileSelected = (profile: User) => {
        dispatch(setSelectedProfile(profile))
        setShow(false);
    }
    const router = useRouter()
    useEffect(() => {
        if(auth.accessToken && !selectedProfile && profilesData) {
            setShow(true)
        }
    }, [auth, profilesData, selectedProfile])

    useEffect(() => {
        if(!account) {
            dispatch(deleteTokens())
            dispatch(removeSelectedProfile())
        }
    }, [ account, dispatch ])

    return (
        <>
            <SelectProfile onClose={() => { setShow(false) }} onProfileSelected={handleProfileSelected} show={show} />
            <nav className="flex w-full items-center p-4 sm:p-4 lg:p-12">
                <Link href="/">
                    <img onClick={reloadPage} className="cursor-pointer w-1/2 h-auto w-[120px] lg:w-[188px] h-[40px] lg:h-[60px]" src="/logo.svg" alt="me" />
                </Link>
                <div className='flex ml-auto items-center gap-[10px] lg:gap-[20px]'>
                    {router.pathname === '/' ? <RefreshNewMemeBtn/> : ''}
                    <CreateNewMemeBtn disabled={!selectedProfile} />
                    <CustomConnectButton />
                    <ProfileButton disabled={!selectedProfile} />
                </div>
            </nav>
        </>
    )
}