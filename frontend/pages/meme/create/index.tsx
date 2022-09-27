import { NextPage } from "next"
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GoBackButton } from "../../../components/Buttons/GoBackBtn";
import EditStep from "../../../components/EditStep";
import Loader from "../../../components/Loader";
import { useRandomMeme } from "../../../lib/hooks/useMeme";
import { PublicationData } from "../../../lib/models/Publication/publication.model";
import { useDispatch, useSelector } from 'react-redux'
import { removeImage } from "../../../lib/redux/slices/image";
import { RootState } from "../../../lib/redux/store";

const CreateMemePage: NextPage = () => {
    const [ step, setStep ] = useState(0);
    const router = useRouter();
    const image = useSelector((state: RootState) => state.image.selectedImage);
    const dispatch = useDispatch()

    const onBackClick = () => {
        if(step === 0) router.push('/')
        else {
            dispatch(removeImage())
            setStep(step => step-1)
        }
    }

    const handleUpload = (newPublication: PublicationData) => {
        router.push(`/meme/${newPublication.id}/success`)
    }

    return (
        <Container fluid="md" className='h-full'>
            <Row className='mb-4'>
                <Col>
                    <GoBackButton onClick={onBackClick} />
                </Col>
            </Row>
            <Row>
              { typeof window !== 'undefined' && <EditStep initialImage={image} onUpload={handleUpload} /> }
            </Row>
        </Container>
    )
}

export default CreateMemePage;

