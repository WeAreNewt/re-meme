import { NextPage } from "next"
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GoBackButton } from "../../../components/Buttons/GoBackBtn";
import EditStep from "../../../components/EditStep";
import { PublicationData } from "../../../lib/models/Publication/publication.model";
import { useDispatch, useSelector } from 'react-redux'
import { removeImage } from "../../../lib/redux/slices/image";
import { RootState } from "../../../lib/redux/store";
import NoSsrWrapper from "../../../components/NoSsrWrapper";

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
        <>
            <Row className='mb-4'>
                <Col>
                    <GoBackButton onClick={onBackClick} />
                </Col>
            </Row>
            <Row>
                <NoSsrWrapper>
                    <EditStep initialImage={image} onUpload={handleUpload} />
                </NoSsrWrapper>
            </Row>
        </>
    )
}

export default CreateMemePage;

