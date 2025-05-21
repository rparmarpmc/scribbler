import { call, put, takeLatest } from 'redux-saga/effects'

import { changeCartQuantity } from './api'
import { apiChangeCartItemQuantity, apiGetCartContentSuccess } from '../store/actions'

function* fetchCartQuantityCall({ payload: { itemKey, itemQuantity, giftKey, giftQuantity } }) {
    try {
        const response = yield call(changeCartQuantity, itemKey, itemQuantity, giftKey, giftQuantity)

        if (response.length === 0) {
            console.log('Problem with changeing cart quantity')
            return
        }

        yield put(apiGetCartContentSuccess(response))
    } catch (e) {
        console.log('api error --> changeCartItemQuantitySaga')
    }
}

function* changeCartItemQuantitySaga() {
    yield takeLatest(apiChangeCartItemQuantity, fetchCartQuantityCall)
}

export default changeCartItemQuantitySaga
