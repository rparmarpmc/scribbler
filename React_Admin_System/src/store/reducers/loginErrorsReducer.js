import { LOGIN_USER_ERRORS } from '../actions/actionTypes'

const initialState = []

const loginErrorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_ERRORS:
            return [...action.payload.errors]
        default:
            return state
    }
}

export default loginErrorsReducer
