import type { NextPage } from 'next'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GoBackButton } from '../../components/Buttons/GoBackBtn'
import PageLayout from '../../components/Layout'
import { ConnectionBox } from '../../components/Layout/ConnectionBox'
import { MemePreview } from '../../components/Meme/MemePreview'
import useWindowDimensions from '../../lib/hooks/window-dimensions.hook'
import { User } from '../../lib/models/User/user.model'
import { getSimplifiedAddress } from '../../lib/utils/text'
import { RootState } from '../../lib/redux/store'
import { removeSelectedProfile } from '../../lib/redux/slices/user'

type ProfileProps = {
    profile: User;
}

const Profile: NextPage = (props: any) => {
    const { width } = useWindowDimensions();
    const selectedProfile = useSelector((store: RootState) => store.user.selectedProfile)
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(removeSelectedProfile());
    }

    return (
        <div className='profile-bg min-h-screen'>
            <PageLayout>
                <Container fluid="md">
                    <Row className='mb-4 mt-4 lg:mt-0'>
                        <Col>
                            {
                                width > 850 && selectedProfile ?
                                    <GoBackButton route="/" />
                                    :
                                    width > 850 && !selectedProfile ? <ConnectionBox /> : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <article className='space-y-10 comic-border rounded-4xl n:p-5 lg:p-20 bg-white relative'>
                                <header className='border-b-2 border-gray-200 border-solid pb-6'>
                                    <div className="flex items-center comic-border-mini border-3 bg-white border-black border-solid rounded-full comic-border-mini max-w-max absolute -top-12 lg:-top-16">
                                        <Image src={props.profile?.coverPicture?.uri || "/assets/icons/profile.svg"}
                                            width={width > 850 ? "115" : "80"} height={width > 850 ? "115" : "80"} />
                                    </div>
                                    <div> {/*flex n:flex-col md:flex-row n:items-start lg:items-center lg:justify-between */}
                                        {
                                            width < 850 ?
                                                <div className='flex flex-row justify-end'>
                                                    <button onClick={handleLogout} className="comic-border-mini rounded-full bg-white py-1 px-2 max-h-14">
                                                        <Image src="/assets/icons/logout.svg" className='mt-1' width="30" height="30" />
                                                    </button>
                                                </div>
                                                : null
                                        }
                                        <Row className='justify-between items-center'>
                                            <Col>
                                                <h2 className='font-medium n:text-3xl lg:text-4xl'>{props.profile.name}</h2>
                                                <p className='font-medium n:text-sm lg:text-xs'>{getSimplifiedAddress(props.profile.address || "")} • {props.profile.posts?.length || 0} memes created</p>
                                            </Col>
                                            {
                                                width > 850 ?
                                                    <Col className='text-right'>
                                                        <button onClick={handleLogout} className="comic-border-mini rounded-full bg-white px-3 py-1 max-h-10">
                                                            <div className='flex items-center space-x-3'>
                                                                <Image src="/assets/icons/logout.svg" width="20" height="20" />
                                                                <span className='font-medium'>Log out</span>
                                                            </div>
                                                        </button>
                                                    </Col>
                                                    : null
                                            }
                                        </Row>
                                    </div>
                                </header>
                                <section>
                                    <Row className='mb-4'>
                                        <Col>
                                            <h3>MEMES CREATED</h3>
                                        </Col>
                                    </Row>
                                    <Row className='flex n:flex-col lg:flex-row justify-center n:space-y-4 lg:space-y-0'>
                                        {
                                            props.profile.posts.filter((p, i) => i < 3)
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

    const user: User = {
        name: "cryptopunk",
        address: "0xE0Aff1C05dA6aF0e6779fB04AbB872c511CA6332",
        handle: 'test.lens',
        posts: [
            {
                id: 1,
                src: "/assets/imgs/meme.png",
                remixCount: 210,
                publicationDate: new Date().getTime(),
            },
            {
                id: 2,
                src: "/assets/imgs/distracted boyfriend.png",
                remixCount: 210,
                publicationDate: new Date().getTime()
            },
            {
                id: 3,
                src: "/assets/imgs/distracted boyfriend.png",
                remixCount: 210,
                publicationDate: new Date().getTime()
            },
        ],
        stats: {}
    }

    return {
        props: {
            profile: user,
        }
    }

}

export async function getStaticPaths() {
    return {
        paths: [{ params: { profileId: '1' } }],
        fallback: false
    }
}

export default Profile
