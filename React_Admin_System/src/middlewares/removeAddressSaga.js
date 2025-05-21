import { call, put, takeLatest } from 'redux-saga/effects'

import { removeAddress } from './api'
import { apiRemoveAddress, apiRemoveAddressSuccess } from '../store/actions'

function* fetchRemoveAddressCall({ payload: { id } }) {
    try {
        const response = yield call(removeAddress, id)
        yield put(apiRemoveAddressSuccess(response))
    } catch (e) {
        console.log('api error --> apiRemoveAddress')
    }
}

function* removeAddressSaga() {
    yield takeLatest(apiRemoveAddress, fetchRemoveAddressCall)
}

export default removeAddressSaga
