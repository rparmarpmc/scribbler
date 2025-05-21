import { call, put, takeEvery } from 'redux-saga/effects'

import { getCartContent } from './api'
import { apiGetCartContent, apiGetCartContentSuccess } from '../store/actions'

function* fetchCartContentCall() {
    try {
        const response = yield call(getCartContent)

        if (response.length === 0) {
            console.log('Problem with getting cart content')
            return
        }

        yield put(apiGetCartContentSuccess(response))
    } catch (e) {
        console.log('api error --> apiGetCartContent')
    }
}

function* getCartContentSaga() {
    yield takeEvery(apiGetCartContent, fetchCartContentCall)
}

export default getCartContentSaga
