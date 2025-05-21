import { REGISTER_USER_ERRORS } from '../actions/actionTypes'

const initialState = []

const registerErrorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_ERRORS:
            return [...action.payload.errors]
        default:
            return state
    }
}

export default registerErrorsReducer
