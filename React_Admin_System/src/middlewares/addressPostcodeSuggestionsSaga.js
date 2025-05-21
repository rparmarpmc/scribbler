import { call, put, takeLatest } from 'redux-saga/effects'

import { getAutocomplettePostcodeDetails } from './api'
import { LOGATE_ADDRESS_API_KEY } from '../config'
import { apiGetPostcodeSuggestions, apiGetAddressSuggestionsSuccess } from '../store/actions'

function* fetchAddAddressSuggestionCall({ payload: { zip, country, id } }) {
    try {
        const response = yield call(getAutocomplettePostcodeDetails, zip, country, id, LOGATE_ADDRESS_API_KEY)

        if (response?.Items?.length === 0) {
            console.log('Problem with getting address suggestion')
            return
        }

        yield put(apiGetAddressSuggestionsSuccess(response.Items))
    } catch (e) {
        console.log('api error --> apiGetAddressSuggestions')
    }
}

function* addressPostcodeSuggestionsSaga() {
    yield takeLatest(apiGetPostcodeSuggestions, fetchAddAddressSuggestionCall)
}

export default addressPostcodeSuggestionsSaga
