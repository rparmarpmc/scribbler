import { call, put, takeEvery } from 'redux-saga/effects'

import { saveItemChange } from './api'
import { apiAddPostageAndDelayedDelivery, apiGetCartContentSuccess } from '../store/actions'

function* fetchAddAddressAndDefaultShippingCall({ payload: { quantity, key, properties, giftQuantity, giftKey, giftProperties } }) {
    try {
        if (giftKey) {
            let response = yield call(saveItemChange, quantity, key, properties)
            if (response.length === 0) {
                console.log('Problem with setting product shipping properties')
                return
            }

            response = yield call(saveItemChange, giftQuantity, giftKey, giftProperties)

            yield put(apiGetCartContentSuccess(response))
        } else {
            const response = yield call(saveItemChange, quantity, key, properties)
            if (response.length === 0) {
                console.log('Problem with setting product shipping properties')
                return
            }

            yield put(apiGetCartContentSuccess(response))
        }
    } catch (e) {
        console.log('api error --> apiAddPostageAndDelayedDeliverySaga')
    }
}

function* apiAddPostageAndDelayedDeliverySaga() {
    yield takeEvery(apiAddPostageAndDelayedDelivery, fetchAddAddressAndDefaultShippingCall)
}

export default apiAddPostageAndDelayedDeliverySaga
