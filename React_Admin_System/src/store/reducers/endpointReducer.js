import { ADD_ENDPOINT } from '../actions/actionTypes'

const initialState = ''

const endpointReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ENDPOINT:
            return action.payload

        default:
            return state
    }
}

export default endpointReducer
