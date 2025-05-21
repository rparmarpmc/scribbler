import { API_GET_FONTS_SUCCESS } from '../actions/actionTypes'

const initialState = []

const fontsReducer = (state = initialState, action) => {
    let fonts = []
    switch (action.type) {
        case API_GET_FONTS_SUCCESS:
            for (const [font] of Object.entries(action.payload)) {
                if (action.payload[font].show_in_template) {
                    fonts.push(action.payload[font])
                }
            }

            fonts.sort((a, b) => {
                return a.id - b.id
            })

            return [...fonts]
        default:
            return state
    }
}

export default fontsReducer
