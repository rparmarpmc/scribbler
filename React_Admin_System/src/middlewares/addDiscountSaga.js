import { call, put, takeEvery, select } from 'redux-saga/effects'

import { addDiscount, getCartContent } from './api'
import { apiAddDiscount, apiGetCartContentSuccess, apiAddDiscountSuccess } from '../store/actions'

function* fetchAddDiscountCall({ payload: { discount_code } }) {
    try {
        const cartContent = yield select((state) => state.cartContent)
        const response = yield call(addDiscount, discount_code, cartContent.token)

        if (response.length === 0) {
            console.log('Problem with adding discount to basket')
            return
        }

        if (response?.payload?.data?.cartDiscountCodesUpdate?.cart?.discountCodes?.some((e) => e.applicable === true)) {
            // console.log('>>>>> >>> we found  dode', discount_code)
            // yield put(apiAddDiscountSuccess('Discount code found'))
        } else {
            // console.log('>>>>> >>> we didint found  dode', discount_code)
            if (discount_code !== '-') {
                yield put(apiAddDiscountSuccess(discount_code + ' code not found'))
            }
        }

        const cartResponse = yield call(getCartContent)

        if (cartResponse.length === 0) {
            console.log('Problem with adding discount to basket')
            return
        }
        yield put(apiGetCartContentSuccess(cartResponse))
    } catch (e) {
        console.log('api error --> apiAddDiscount')
    }
}

function* addDiscountSaga() {
    yield takeEvery(apiAddDiscount, fetchAddDiscountCall)
}

export default addDiscountSaga
