import { ADD_ORIGINAL_IMAGES, API_SAVE_TEMPLATE_SUCCESS, REMOVE_GENERATED_IMAGES } from '../actions/actionTypes'

const initialState = [null, null, null, null]

const productImagesReducer = (state = initialState, action) => {
    let newImages = {}

    switch (action.type) {
        case ADD_ORIGINAL_IMAGES:
            return [...action.payload]
        case API_SAVE_TEMPLATE_SUCCESS:
            newImages = [...state]

            newImages[action.payload.activePage].generated_image = {
                src: action.payload.pages[action.payload.activePage].path
            }

            return [...newImages]
        case REMOVE_GENERATED_IMAGES:
            newImages = [...state]

            delete newImages[action.payload.activePage].generated_image

            return [...newImages]
        default:
            return state
    }
}

export default productImagesReducer
