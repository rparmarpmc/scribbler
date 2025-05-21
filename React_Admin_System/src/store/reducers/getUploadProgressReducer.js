import { UPLOAD_PROGRESS } from '../actions/actionTypes'

const initialState = []

const getUploadProgressReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_PROGRESS:
            return [action.payload]

        default:
            return state
    }
}

export default getUploadProgressReducer
