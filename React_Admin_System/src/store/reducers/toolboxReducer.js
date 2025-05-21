import { ADD_TOOLBOX_TYPE, REMOVE_TOOLBOX_TYPE } from '../actions/actionTypes'

const initialState = false

const toolboxReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOOLBOX_TYPE:
            return action.payload
        case REMOVE_TOOLBOX_TYPE:
            return false
        default:
            return state
    }
}

export default toolboxReducer
