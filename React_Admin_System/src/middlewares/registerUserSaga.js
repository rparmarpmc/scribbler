import { call, takeLatest, put } from 'redux-saga/effects'

import { register } from './api'
import { registerUser, registerUserErrors } from '../store/actions'

function* fetchregisterUserCall({ payload: { firstName, lastName, email, password, privacy, terms, offers } }) {
    try {
        const response = yield call(register, firstName, lastName, email, password, privacy, terms, offers)

        if (response.data?.token_url) {
            window.location = response.data.token_url.replace('https:', 'http:')
        } else {
            yield put(registerUserErrors({ errors: response.error_msg }))
        }
    } catch (e) {
        console.log('api error --> registerUserSaga')
    }
}

function* registerUserSaga() {
    yield takeLatest(registerUser, fetchregisterUserCall)
}

export default registerUserSaga
