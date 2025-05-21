import { API_GET_ADDRESS_SUGGESTIONS_SUCCESS, REMOVE_SUGGESTIONS } from '../actions/actionTypes'

const initialState = []

const addressSuggestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_GET_ADDRESS_SUGGESTIONS_SUCCESS:
            return action.payload.length > 0 ? action.payload : []
        case REMOVE_SUGGESTIONS:
            return []
        default:
            return state
    }
}

export default addressSuggestionsReducer
