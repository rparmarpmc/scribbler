import { API_GET_ADDRESSES_SUCCESS, API_ADD_ADDRESS_SUCCESS, API_REMOVE_ADDRESS_SUCCESS } from '../actions/actionTypes'

const initialState = false

const userAddressesReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_GET_ADDRESSES_SUCCESS:
            return action.payload
        case API_ADD_ADDRESS_SUCCESS:
            return action.payload
        case API_REMOVE_ADDRESS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default userAddressesReducer
