import * as faceapi from 'face-api.js';

const MODEL_URL = "../models";

async function loadImports() {    
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

function loadPhotos() {
    return []; //wait for backend
}

async function getFullFaceDescriptions(userFacePhoto) {
    const img = await faceapi.fetchImage(userFacePhoto);
    return await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
}

export async function userFaceDetection(userFacePhoto) {
    await loadImports();
    const userFaceDesc = await getFullFaceDescriptions(userFacePhoto);
    const photos = loadPhotos();

    const photosDesc = await Promise.all(
        photos.map(async photo => {
            const img = await faceapi.fetchImage(photo);

            const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            const faceDescriptors = [fullFaceDescription.descriptor];

            return new faceapi.LabeledFaceDescriptors(photo, faceDescriptors);
        })
    );

    const maxDescriptorDistance = 0.6;
    const faceMatcher = new faceapi.FaceMatcher(photosDesc, maxDescriptorDistance);

    const results = userFaceDesc.map(fd => faceMatcher.findBestMatch(fd.descriptor))

    results.forEach((bestMatch, i) => {
        console.log(bestMatch)
        console.log(i)
    })
}
