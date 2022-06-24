import { is } from "immer/dist/internal";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { LegacyRef, SVGProps, useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
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


type CreateMemePageProps = {
    exampleMeme: any; //Meme
}

interface MemixerText {
    value: string
    font: string
    fontColor: string
    shadowColor: string
    size: number
    x: number
    y: number
}

const defaultMemixerText = {
    value: '',
    font: '',
    fontColor: '#FFFFFF',
    shadowColor: '#000000',
    size: 20,
    x: 0,
    y: 20
}

interface Position {
    x: number,
    y: number
}

const DraggableText : React.FC<SVGProps<SVGTextElement>> = ({ children, ...rest }) => {
    const ref = useRef<SVGTextElement>()
    const [pos, setPos] = useState<Position>({
        x: 0,
        y: 20
    })
    const [dragging, setDragging] = useState<boolean>(false)

    const handleDragging = (e) => {
        setPos(oldPos => ({
            x: oldPos.x + e.movementX,
            y: oldPos.y + e.movementY
        }))
    }

    const handleMouseDown = () => {
        ref.current?.addEventListener('mousemove', handleDragging)
        document.addEventListener('mouseup', () => {
            ref.current?.removeEventListener('mousemove', handleDragging)
        })
    }

    return (
        <span
            style={{
                top: `${pos.y}px`,
                left: `${pos.x}px`
            }}
            className={ `select-none absolute` }
            ref={ref}
            {...rest}
            onMouseDown={handleMouseDown}
        >
            {children}
        </span>
    )
}

const CreateMemePage: NextPage = (props: any) => {
    const { height, width } = useWindowDimensions();
    const [ openTextModal, setOpenTextModal ] = useState({
        open: false,
        index: 0
    })
    const [ texts, setTexts ] = useState<MemixerText[]>([defaultMemixerText])
    const [memeBuffer, setMemeBuffer] = useState();
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

    const fileSelectHandler = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (!e.target) return;

                setMemeBuffer(e.target.result as any);
            };

            reader.readAsDataURL(input.target.files[0]);
        }
    }

    const isSmallScreen = width < 850

    const memeControllBtns = [
        {
            src: "/assets/icons/edit-meme-1.svg",
            handleClick: () => {
                setTexts(texts => texts.concat([defaultMemixerText]))
            }
        },
        {
            src: "/assets/icons/edit-meme-2.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-3.svg",
            handleClick: () => {

            }
        },
        {
            src: "/assets/icons/edit-meme-4.svg",
            handleClick: () => {

            }
        }
    ]

    const handleMemeText = (e, index) => {
        const selectedMemixerText = texts[index]
        const newMemixerText = { ...selectedMemixerText, value: e.target.value}
        const newTexts = texts.slice()
        newTexts[index] = newMemixerText
        setTexts(newTexts)
    }

    const openEditTextModal = (index: number) => {
        setOpenTextModal({
            index,
            open: true
        })
    }

    return (
        <div className='home-bg min-h-screen'>
            <Head>
                <title></title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <EditTextModal setOpen={setOpenTextModal} index={openTextModal.index} open={openTextModal.open} />
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
                                        memeBuffer ? (
                                            <>
                                                <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative w-full">
                                                    <div
                                                        className="relative overflow-hidden"
                                                    >
                                                            <img src={memeBuffer} width="100%" />
                                                            {
                                                                texts.map((text, index) => 
                                                                    <DraggableText
                                                                        key={`svg_text_${index}`}
                                                                        color={text.fontColor}
                                                                        fontSize={text.size}
                                                                    >
                                                                        {text.value}
                                                                    </DraggableText>
                                                                )
                                                            }
                                                    </div>
                                                </div>
                                                <div className={`comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center ${isSmallScreen ? 'w-full' : 'w-2/3'}`}>
                                                    <p className="text-lg font-bold">MEMIXER CONTROLS</p>
                                                    {
                                                        texts.map((text, index) =>
                                                            <div key={`memixer_text_${index}`} className="border-2 border-black border-solid rounded-xl mb-4 flex p-2 gap-2 w-full">
                                                                <input
                                                                    onChange={e => handleMemeText(e, index)}
                                                                    className="w-full focus:outline-none"
                                                                    placeholder={`Text #${index + 1}`}
                                                                    value={text.value}
                                                                />
                                                                <button className="w-4 flex items-center" onClick={() => openEditTextModal(index)}>
                                                                    <img src="/assets/icons/pencil.svg" />
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="flex space-x-3 mb-4">
                                                        {
                                                            memeControllBtns.map((btn, i) => (
                                                                <div key={"mbicon-" + i} onClick={btn.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                                                                    <Image src={btn.src} width="30" height="30" />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <button onClick={() => {}} className={"create-btn-gradient rounded-full border-black border-solid border-3 px-16 sm:px-16 lg:px-20 py-3 text-lg font-bold absolute -bottom-10 " + (false ? "opacity-30" : "comic-border-mini")}>
                                                        REMIX
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <MemeDetail meme={props.exampleMeme} inspired />
                                                <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full h-full lg:h-1/2">
                                                    <p className="text-3xl font-bold mb-8">Create new meme</p>
                                                    <button onClick={uploadMeme} className="comic-border-mini rounded-full bg-purple py-1 font-medium w-full lg:w-4/5 mb-3">Upload image</button>
                                                    <button onClick={handleCreateBlankCanvas} className="comic-border-mini rounded-full bg-white py-1 font-medium w-full lg:w-4/5">Start from blank canvas</button>
                                                    <input id='select-meme' hidden type="file" onChange={fileSelectHandler} />
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
