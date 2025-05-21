import { call, put, takeEvery, select } from 'redux-saga/effects'

import { generateImages } from './api'
import { apiGenerateAddToCartPdf, apiGenerateAddToCartPdfSuccess } from '../store/actions'

function* fetchAddToCartPDFCall({ payload: { variantId, wait_for } }) {
    try {
        const productId = yield select((state) => state.productId)
        const endpoint = yield select((state) => state.endpoint)
        const pageTemplates = yield select((state) => state.pageTemplates)
        const data = { productId: productId, variantId: variantId, pageTemplates: pageTemplates, wait_for }

        const response = yield call(generateImages, endpoint, data)

        if (response.length === 0) {
            console.log('Problem generating PDF')
            return
        }

        yield put(apiGenerateAddToCartPdfSuccess({ pdfProduction: response.pdf_production, pdfEndUser: response.pdf_end_user }))
    } catch (e) {
        console.log('api error --> addToCartSaga')
    }
}

function* addToCartSaga() {
    yield takeEvery(apiGenerateAddToCartPdf, fetchAddToCartPDFCall)
}

export default addToCartSaga
