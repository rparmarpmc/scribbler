import { API_GENERATE_ADD_TO_CART_PDF_SUCCESS } from '../actions/actionTypes'

const initialState = {}

const addToCartCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_GENERATE_ADD_TO_CART_PDF_SUCCESS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default addToCartCardReducer
