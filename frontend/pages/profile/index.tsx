import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import { GoBackButton } from '../../components/Buttons/GoBackBtn'
import PageLayout from '../../components/Layout'
import { MemePreview } from '../../components/Meme/MemePreview'
import { isNftImage, User } from '../../lib/models/User/user.model'
import { removeSelectedProfile } from '../../lib/redux/slices/user'
import { RootState } from '../../lib/redux/store'
import { getSimplifiedAddress } from '../../lib/utils/text'

type ProfileProps = {
    createdMemmes: any[]
}

const Profile: NextPage = (props: any) => {
    const { address } = useAccount();
    const selectedProfile = useSelector((store: RootState) => store.user.selectedProfile)
    const dispatch = useDispatch();
    const router = useRouter();
    const profilePicture = selectedProfile?.picture && !isNftImage(selectedProfile.picture) ? selectedProfile.picture.original.url : "/assets/icons/profile.svg"

    const mockMemes = [
        {
            id: 1,
            src: "/assets/imgs/meme.png",
            remixCount: 210,
            publicationDate: new Date()
        },
        {
            id: 2,
            src: "/assets/imgs/distracted boyfriend.png",
            remixCount: 210,
            publicationDate: new Date()
        },
        {
            id: 3,
            src: "/assets/imgs/distracted boyfriend.png",
            remixCount: 210,
            publicationDate: new Date()
        },
    ]

    const handleLogout = () => {
        dispatch(removeSelectedProfile());
        router.push('/')
    }

    return (
        <div className='profile-bg min-h-screen'>
            <PageLayout>
                <Container fluid="md">
                    <Row className='mb-4'>
                        <Col>
                            <GoBackButton route="/" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <article className='space-y-10 comic-border rounded-4xl p-20 bg-white relative'>
                                <header className='border-b-2 border-gray-200 border-solid pb-6'>
                                    <div className="flex items-center comic-border-mini border-3 bg-white border-black border-solid rounded-full comic-border-mini max-w-max absolute -top-16 overflow-hidden">
                                        <img src={profilePicture} width="115" height="115" />
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Row>
                                            <Col>
                                                <h2 className='font-medium text-4xl'>{selectedProfile?.name}</h2>
                                                <p className='font-medium text-xs'>{getSimplifiedAddress(address || "")} • {selectedProfile?.posts?.length || 0} memes created</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <button onClick={handleLogout} className="comic-border-mini rounded-full bg-white px-4 max-h-8 text-base">
                                                    <div className='flex items-center space-x-3'>
                                                        <Image src="/assets/icons/logout.svg" width="20" height="20" />
                                                        <span className='font-medium'>Log out</span>
                                                    </div>
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </header>
                                <section>
                                    <Row className='mb-4'>
                                        <Col>
                                            <h3>MEMES CREATED</h3>
                                        </Col>
                                    </Row>
                                    <Row className='justify-center'>
                                        {
                                            /* user.posts */mockMemes.filter((p, i) => i < 3)
                                                .map((p, i) => (
                                                    <Col key={"prof-meme-" + i}>
                                                        <MemePreview meme={p} />
                                                    </Col>
                                                ))
                                        }
                                    </Row>
                                </section>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </PageLayout>
        </div>
    )
}

export const getStaticProps = async ({ params }: any): Promise<{ props: ProfileProps }> => {

    //TODO retrieve memes from user with apollo

    return {
        props: {
            createdMemmes: [],
        }
    }

}

export default Profile
