import { UPLOAD_FAILURE } from '../actions/actionTypes'

const initialState = []

const getUploadSuccessReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_FAILURE:
            return [action.payload]

        default:
            return state
    }
}

export default getUploadSuccessReducer
