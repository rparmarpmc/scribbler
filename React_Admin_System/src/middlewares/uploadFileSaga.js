import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { uploadRequest, uploadProgress, uploadFailure, addImageToSection } from '../store/actions'
import createUploadFileChannel from './createFileUploadChannel'
import { API_IMAGE_UPLOAD_ENDPOINT } from '../config'

export function* uploadFileCall(file, sectionIndex, pageIndex) {
    const endpoint = yield select((state) => state.endpoint)
    const channel = yield call(createUploadFileChannel, `${endpoint}${API_IMAGE_UPLOAD_ENDPOINT}`, file)

    while (true) {
        const { progress = 0, err, success, response } = yield take(channel)

        if (err) {
            yield put(uploadProgress({}))
            yield put(uploadFailure({ err, sectionIndex, pageIndex }))
            return
        }
        if (success) {
            const responseObject = JSON.parse(response)
            if (responseObject.s3_path) {
                yield put(uploadProgress({}))

                let imageWidth = responseObject.data.width || 300
                let imageHeight = responseObject.data.height || 400
                // 1.= 0 degrees: the correct orientation, no adjustment is required.
                // 2.= 0 degrees, mirrored: image has been flipped back-to-front.
                // 3.= 180 degrees: image is upside down.
                // 4.= 180 degrees, mirrored: image has been flipped back-to-front and is upside down.
                // 5.= 90 degrees: image has been flipped back-to-front and is on its side.
                // 6.= 90 degrees, mirrored: image is on its side.
                // 7.= 270 degrees: image has been flipped back-to-front and is on its far side.
                // 8.= 270 degrees, mirrored: image is on its far side.
                if (responseObject?.data?.orientation === 5 || responseObject?.data?.orientation === 6 || responseObject?.data?.orientation === 7 || responseObject?.data?.orientation === 8) {
                    yield put(addImageToSection({ image: responseObject.s3_path, width: imageHeight, height: imageWidth, sectionIndex, pageIndex })) // flip height and width
                } else {
                    yield put(addImageToSection({ image: responseObject.s3_path, width: imageWidth, height: imageHeight, sectionIndex, pageIndex }))
                }
            }
            return
        }

        yield put(uploadProgress({ progress, sectionIndex, pageIndex }))
    }
}

function* uploadFileSaga() {
    yield takeLatest(uploadRequest, function* (action) {
        yield call(uploadFileCall, action.payload.file, action.payload.sectionIndex, action.payload.pageIndex)
    })
}

export default uploadFileSaga
