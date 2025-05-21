import { ADD_BASKET_ERRORS, REMOVE_BASKET_ERRORS } from '../actions/actionTypes'

const initialState = []

const basketErrorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BASKET_ERRORS:
            return [...state, ...action.payload]
        case REMOVE_BASKET_ERRORS:
            return []
        default:
            return state
    }
}

export default basketErrorsReducer
