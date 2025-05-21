import { call, put, takeLatest } from 'redux-saga/effects'

import { getAutocompleteSuggestions } from './api'
import { LOGATE_ADDRESS_API_KEY } from '../config'
import { apiGetAddressSuggestions, apiGetAddressSuggestionsSuccess } from '../store/actions'

function* fetchAddAddressCall({ payload: { term, country } }) {
    try {
        const response = yield call(getAutocompleteSuggestions, term, country, LOGATE_ADDRESS_API_KEY)

        if (response?.Items?.length === 0) {
            console.log('Problem with getting address suggestion')
            return
        }

        yield put(apiGetAddressSuggestionsSuccess(response.Items))
    } catch (e) {
        console.log('api error --> apiGetAddressSuggestions')
    }
}

function* addressSuggestionsSaga() {
    yield takeLatest(apiGetAddressSuggestions, fetchAddAddressCall)
}

export default addressSuggestionsSaga
