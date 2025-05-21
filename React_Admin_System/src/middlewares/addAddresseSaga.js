import { call, put, takeLatest, select } from 'redux-saga/effects'

import { addAddress } from './api'
import { apiAddAddress, apiAddAddressSuccess } from '../store/actions'

function* fetchAddAddressCall({ payload: { firstName, lastName, address1, address2, city, province, country, zip, phone, addressType } }) {
    try {
        const userAddresses = yield select((state) => state.userAddresses)

        const data = {
            first_name: firstName,
            last_name: lastName,
            address1: address1,
            address2: address2,
            city: city,
            county: province,
            zip: zip,
            phone: phone,
            country_name: country,
            type: addressType
        }

        let filteredAddresses = []
        if (userAddresses.length > 0) {
            filteredAddresses = userAddresses.filter(
                (address) =>
                    address.first_name === data.first_name && address.last_name === data.last_name && address.address1 === data.address1 && address.city === data.city && address.postcode === data.zip && address.country_name === data.country_name
            )
        }

        if (filteredAddresses.length > 0) return

        const response = yield call(addAddress, data)

        if (response.length === 0) {
            console.log('Problem with adding address via proxy api')
            return
        }

        yield put(apiAddAddressSuccess(response))
    } catch (e) {
        console.log('api error --> addAddresseSaga')
    }
}

function* addAddresseSaga() {
    yield takeLatest(apiAddAddress, fetchAddAddressCall)
}

export default addAddresseSaga
