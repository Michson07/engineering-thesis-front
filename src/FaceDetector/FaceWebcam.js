import React, { useCallback } from "react";
import Webcam from "react-webcam";

export default function FaceWebcam(props) {
    const webcamRef = React.useRef(null);

    const videoConstraints = {
        width: 700,
        height: 300,
        facingMode: "user"
    }

    const capture = useCallback(() => {
            const image = webcamRef.current.getScreenshot();
            props.setUserFacePhoto(image);
        },
    [webcamRef]);

    return (
        <>
            <Webcam 
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <img src={props.userFacePhoto ? props.userFacePhoto : null} alt="napis"/>
            <button onClick={capture}>Capture photo</button>
        </>
        
    )
}