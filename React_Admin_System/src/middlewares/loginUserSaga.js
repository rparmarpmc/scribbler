import { call, takeLatest, put } from 'redux-saga/effects'

import { login } from './api'
import { loginUser, loginUserErrors } from '../store/actions'

function* fetchloginUserCall({ payload: { email, password, returnUrl } }) {
    try {
        const response = yield call(login, email, password, returnUrl)

        if (response.success) {
            window.location = response.data.token_url.replace('https:', 'http:')
        } else {
            yield put(loginUserErrors({ errors: response.error_msg }))
        }
    } catch (e) {
        console.log('api error --> loginUserSaga')
    }
}

function* loginUserSaga() {
    yield takeLatest(loginUser, fetchloginUserCall)
}

export default loginUserSaga
