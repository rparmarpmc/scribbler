import { API_GET_USER_DETAILS_SUCCESS } from '../actions/actionTypes'

const initialState = null

const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_GET_USER_DETAILS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default userDetailsReducer
