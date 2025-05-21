import { call, put, takeEvery } from 'redux-saga/effects'

import { getAddresses } from './api'
import { apiGetAddresses, apiGetAddressesSuccess } from '../store/actions'

function* fetchGetAddressesCall() {
    try {
        const response = yield call(getAddresses)

        yield put(apiGetAddressesSuccess(response))
    } catch (e) {
        console.log('api error --> getAddressesSaga')
    }
}

function* getAddressesSaga() {
    yield takeEvery(apiGetAddresses, fetchGetAddressesCall)
}

export default getAddressesSaga
