import { call, takeEvery, select } from 'redux-saga/effects'

import { updateBasketKey } from './api'
import { apiUpdateCartKey } from '../store/actions'

function* fetchUpdateCartKeyCall() {
    try {
        const cartContent = yield select((state) => state.cartContent)

        const response = yield call(updateBasketKey, cartContent.token)

        if (response.length === 0) {
            console.log('Problem updating cart KEY')
            return
        }
    } catch (e) {
        console.log('api error --> updateCartKeySaga')
    }
}

function* addToCartSaga() {
    yield takeEvery(apiUpdateCartKey, fetchUpdateCartKeyCall)
}

export default addToCartSaga
