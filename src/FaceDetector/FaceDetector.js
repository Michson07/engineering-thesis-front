import React, { useState, useEffect } from "react";
import {userFaceDetection} from "./FaceApi";
import FaceWebcam from "./FaceWebcam";
export default function FaceDetector() {
    const [camera, setCamera] = useState(false);
    const [userFacePhoto, setUserFacePhoto] = useState(null);

    useEffect(() => {
        if(userFacePhoto) {
            userFaceDetection(userFacePhoto);
        }
    }, userFacePhoto);

    return (
        <>
            <button onClick={event => {event.preventDefault(); setCamera(!camera); }}>Camera</button>
            { camera ? <FaceWebcam userFacePhoto={userFacePhoto} setUserFacePhoto={setUserFacePhoto}/> : null }
        </>
    )
}