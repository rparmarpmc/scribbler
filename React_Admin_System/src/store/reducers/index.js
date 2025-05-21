import { combineReducers } from 'redux'

import loggedInReducer from './loggedInReducer'
import endpointReducer from './endpointReducer'
import productImagesReducer from './productImagesReducer'
import productIdReducer from './productIdReducer'
import productFormIdReducer from './productFormIdReducer'
import fontsReducer from './fontsReducer'
import pageTemplateReducer from './pageTemplateReducer'
import buttonTypeReducer from './buttonTypeReducer'
import toolboxReducer from './toolboxReducer'
import generatedCardReducer from './generatedCardReducer'
import addToCartCardReducer from './addToCartCardReducer'
import userAddressesReducer from './userAddressesReducer'
import basketErrorsReducer from './basketErrorsReducer'
import addressSuggestionsReducer from './addressSuggestionsReducer'
import getUploadProgressReducer from './getUploadProgressReducer'
import getUploadFailureReducer from './getUploadFailureReducer'
import loginErrorsReducer from './loginErrorsReducer'
import registerErrorsReducer from './registerErrorsReducer'
import userDetailsReducer from './userDetailsReducer'
import cartContentReducer from './cartContentReducer'
import discountsReducer from './discountsReducer'

export default combineReducers({
    loggedIn: loggedInReducer,
    endpoint: endpointReducer,
    productImages: productImagesReducer,
    productId: productIdReducer,
    productFormId: productFormIdReducer,
    fonts: fontsReducer,
    pageTemplates: pageTemplateReducer,
    buttonType: buttonTypeReducer,
    toolbox: toolboxReducer,
    generatedCard: generatedCardReducer,
    addToCartCard: addToCartCardReducer,
    userAddresses: userAddressesReducer,
    basketErrors: basketErrorsReducer,
    discounts: discountsReducer,
    addressSuggestions: addressSuggestionsReducer,
    getUploadProgress: getUploadProgressReducer,
    getUploadErrors: getUploadFailureReducer,
    loginErrors: loginErrorsReducer,
    registerErrors: registerErrorsReducer,
    userDetails: userDetailsReducer,
    cartContent: cartContentReducer
})
