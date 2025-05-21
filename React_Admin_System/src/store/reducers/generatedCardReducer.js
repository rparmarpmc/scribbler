import { SAVE_GENERATED_CARD } from '../actions/actionTypes'

const initialState = {}

const generatedCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_GENERATED_CARD:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default generatedCardReducer
