import { API_ADD_DISCOUNT_SUCCESS } from '../actions/actionTypes'

const initialState = ''

const discountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_ADD_DISCOUNT_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default discountsReducer
