import { ADD_PRODUCT_FORM_ID } from '../actions/actionTypes'

const initialState = ''

const productFormIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_FORM_ID:
            return action.payload

        default:
            return state
    }
}

export default productFormIdReducer
