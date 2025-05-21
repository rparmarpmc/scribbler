import { call, put, takeLatest } from 'redux-saga/effects'

import { getUserDetails } from './api'
import { apiGetUserDetails, apiGetUserDetailsSuccess } from '../store/actions'

function* fetchGetUserDetailsCall() {
    try {
        const response = yield call(getUserDetails)

        if (response.length === 0) {
            console.log('Problem with api getUserDetailsSaga')
            return
        }

        yield put(apiGetUserDetailsSuccess(response))
    } catch (e) {
        console.log('api error --> getUserDetailsSaga')
    }
}

function* getUserDetailsSaga() {
    yield takeLatest(apiGetUserDetails, fetchGetUserDetailsCall)
}

export default getUserDetailsSaga
