import { is } from "immer/dist/internal";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, LegacyRef, SVGProps, useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAccount } from "wagmi";
import { GoBackButton } from "../../../components/Buttons/GoBackBtn";
import PageLayout from "../../../components/Layout";
import { MemeDetail } from "../../../components/Meme/MemeDetail";
import { MemeEditBtns } from "../../../components/Meme/MemeEditBtns";
import { MemeEditControls } from "../../../components/Meme/MemeEditControls";
import { MemeEditPreview } from "../../../components/Meme/MemeEditPreview";
import { ConfirmModal } from "../../../components/Modals/Confirm";
import EditTextModal from "../../../components/Modals/EditTextModal";
import { FeedbackModal } from "../../../components/Modals/Feedback";
import useWindowDimensions from "../../../hooks/window-dimensions.hook";
import { delay } from "../../../utils/time";
import { fabric } from 'fabric';
import MemeGenerator from "../../../components/MemeGenerator";


type CreateMemePageProps = {
    exampleMeme: any; //Meme
}

const CreateMemePage: NextPage = (props: any) => {
    const { width } = useWindowDimensions();
    const [initialImage, setInitialImage] = useState<string>();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const router = useRouter();

    const handleCreateBlankCanvas = () => {

    }

    const handleConfirmation = (status: boolean) => {
        setShowConfirm(false);

        if (!status) return;

        //TOOD Create meme here

        const createMemeService = async () => {
            await delay(1500);
            setShowFeedback(false);
            const createdMeme = { id: 2 }
            router.push(`/meme/${createdMeme.id}?created=true`);
        }

        setShowFeedback(true);
        createMemeService();
    }

    const uploadMeme = () => {
        document.getElementById("select-meme")!.click()
    }

    const fileSelectHandler: ChangeEventHandler<HTMLInputElement> = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) return;
                setInitialImage(e.target.result?.toString())
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    }

    const isSmallScreen = width < 850

    return (
        <div className='home-bg min-h-screen'>
            <Head>
                <title></title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <FeedbackModal show={showFeedback} />
            <ConfirmModal show={showConfirm} onConfirm={handleConfirmation} />
            <PageLayout>
                <Container fluid="md" className='h-full'>
                    <Row className='mb-4'>
                        <Col>
                            <GoBackButton route="/" />
                        </Col>
                    </Row>
                    <Row className='mt-auto'>
                        <Col>
                            <article className='space-y-10'>
                                <div className={`flex flex-${isSmallScreen ? 'col' : 'row'} gap-10 items-start`}>
                                    {
                                        initialImage ? <MemeGenerator initialImage={initialImage} /> : (
                                            <>
                                                <MemeDetail meme={props.exampleMeme} inspired />
                                                <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full h-full lg:h-1/2">
                                                    <p className="text-3xl font-bold mb-8">Create new meme</p>
                                                    <button onClick={uploadMeme} className="comic-border-mini rounded-full bg-purple py-1 font-medium w-full lg:w-4/5 mb-3">Upload image</button>
                                                    <button onClick={handleCreateBlankCanvas} className="comic-border-mini rounded-full bg-white py-1 font-medium w-full lg:w-4/5">Start from blank canvas</button>
                                                    <input id='select-meme' accept="image/*" hidden type="file" onChange={fileSelectHandler} />
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </article>
                        </Col>
                    </Row>
                </Container>

            </PageLayout>
        </div>
    )
}

export const getStaticProps = async ({ params }: any): Promise<{ props: CreateMemePageProps }> => {

    //TODO retrieve random meme with apollo

    const meme = {
        id: 1,
        src: "/assets/imgs/meme.png",
        mockProfile: {
            id: 1,
            name: "cryptopunk",
            profilePic: "/assets/imgs/punk.png"
        },
        remixCount: 210,
        publicationDate: new Date().getTime()
    }

    return {
        props: {
            exampleMeme: meme,
        }
    }

}

export default CreateMemePage
