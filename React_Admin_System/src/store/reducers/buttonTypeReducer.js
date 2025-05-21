import { SET_BUTTON_TYPE } from '../actions/actionTypes'

const initialState = 'personalize'

const pageTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUTTON_TYPE:
            return action.payload.buttonType
        default:
            return state
    }
}

export default pageTemplateReducer
