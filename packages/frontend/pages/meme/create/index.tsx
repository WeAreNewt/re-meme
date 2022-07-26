import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GoBackButton } from "../../../components/Buttons/GoBackBtn";
import PageLayout from "../../../components/Layout";
import { ConfirmModal } from "../../../components/Modals/Confirm";
import { FeedbackModal } from "../../../components/Modals/Feedback";
import useMeme from "../../../hooks/useMeme";
import { PublicationData } from "../../../models/Publication/publication.model";
import { delay } from "../../../utils/time";
import CreateStep from "./CreateStep";
import EditStep from "./EditStep";
import FeedbackStep from "./FeedbackStep";

const CreateMemePage: NextPage = () => {

    const { data } = useMeme('0x3aed-0x13')

    const [ step, setStep ] = useState(0);
    const [initialImage, setInitialImage] = useState<string>();
    const [ uploadedImage, setUploadedImage ] = useState<string>();
    const router = useRouter();

    const goNext = () => setStep(step => step + 1)

    const onBackClick = () => {
        if(step === 0) router.push('/')
        else {
            setInitialImage(undefined)
            setStep(step => step-1)
        }
    }

    const handleUpload = (svg: string) => {
        setUploadedImage(svg)
        goNext()
    }

    return (
        <Container fluid="md" className='h-full'>
            <Row className='mb-4'>
                <Col>
                    <GoBackButton onClick={onBackClick} />
                </Col>
            </Row>
            <Row>
                { step === 0 && data && <CreateStep meme={data.publication} setInitialImage={setInitialImage} goNext={goNext} /> }
                { step === 1 && <EditStep initialImage={initialImage} onUpload={handleUpload} /> }
                { step === 2 && uploadedImage && <FeedbackStep image={uploadedImage} />}
            </Row>
        </Container>
    )
}

export default CreateMemePage;

