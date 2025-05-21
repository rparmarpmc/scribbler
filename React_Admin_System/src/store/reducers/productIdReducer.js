import { ADD_PRODUCT_ID } from '../actions/actionTypes'

const initialState = ''

const productIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_ID:
            return action.payload

        default:
            return state
    }
}

export default productIdReducer
