import { LOGGED_IN } from '../actions/actionTypes'

const initialState = false

const loggedInReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return action.payload

        default:
            return state
    }
}

export default loggedInReducer
