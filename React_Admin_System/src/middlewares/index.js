import { all } from 'redux-saga/effects'

import addAddresseSaga from './addAddresseSaga'
import addDiscountSaga from './addDiscountSaga'
import addressPostcodeSuggestionsSaga from './addressPostcodeSuggestionsSaga'
import addressSuggestionsSaga from './addressSuggestionsSaga'
import addToCartSaga from './addToCartSaga'
import apiAddAddressAndDefaultPostageSaga from './apiAddAddressAndDefaultPostageSaga'
import apiAddMultipleAddressesAndDefaultPostageSaga from './apiAddMultipleAddressesAndDefaultPostageSaga'
import apiAddPostageAndDelayedDeliverySaga from './apiAddPostageAndDelayedDeliverySaga'
import apiAttachGiftToCardSaga from './apiAttachGiftToCardSaga'
import changeCartItemQuantitySaga from './changeCartItemQuantitySaga'
import getAddressesSaga from './getAddressesSaga'
import getCartContentSaga from './getCartContentSaga'
import getUserDetailsSaga from './getUserDetailsSaga'
import loginUserSaga from './loginUserSaga'
import registerUserSaga from './registerUserSaga'
import removeAddressSaga from './removeAddressSaga'
import updateCartKeySaga from './updateCartKeySaga'
import uploadFileSaga from './uploadFileSaga'

export default function* rootSaga() {
    yield all([
        addToCartSaga(),
        addDiscountSaga(),
        getAddressesSaga(),
        addAddresseSaga(),
        removeAddressSaga(),
        addressSuggestionsSaga(),
        addressPostcodeSuggestionsSaga(),
        uploadFileSaga(),
        loginUserSaga(),
        registerUserSaga(),
        getUserDetailsSaga(),
        getCartContentSaga(),
        changeCartItemQuantitySaga(),
        updateCartKeySaga(),
        apiAddAddressAndDefaultPostageSaga(),
        apiAddMultipleAddressesAndDefaultPostageSaga(),
        apiAddPostageAndDelayedDeliverySaga(),
        apiAttachGiftToCardSaga()
    ])
}
