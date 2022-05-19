import Image from 'next/image'
import Link from 'next/link'
import { CreateNewMemeBtn } from '../../Buttons/CreateNewMemeButton'
import { CustomConnectButton } from '../../Buttons/CustomConnectButton/index'
import { ProfileButton } from '../../Buttons/ProfileButton'

export const Header: React.FC<{}> = ({ }) => {
    const handleCreateClick = () => {

    }

    return (
        <nav className="flex w-full p-12">
            <Link href="/">
                <Image src="/logo.svg" alt="me" width="188.5" height="60.1" />
            </Link>
            <div className='flex ml-auto h-12 space-x-5'>
                <CreateNewMemeBtn />
                <CustomConnectButton />
                <ProfileButton />
            </div>
        </nav>
    )
}