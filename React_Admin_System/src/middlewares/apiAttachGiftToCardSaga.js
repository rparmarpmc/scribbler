import { call, put, takeEvery } from 'redux-saga/effects'

import { addGiftReferenceToCard, getDeliveryOptions, addItem } from './api'
import { countryToCode } from '../helpers/countryToCode'
import { apiAttachGiftToCard, apiGetCartContent } from '../store/actions'

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function* fetchAddAddressAndDefaultShippingCall({ payload: { item, variantId } }) {
    try {
        const randomInt = randomIntFromInterval(100000, 10000000)
        let options = []
        //update orginal product gift reference
        let properties = Object.assign({}, item.properties)
        properties['_connected_gift_id'] = randomInt
        yield call(addGiftReferenceToCard, item.key, item.quantity, properties)

        //get default shipping option for gift
        if (item.properties['_shipping_address']) {
            const addressObject = JSON.parse(item.properties['_shipping_address'])
            const shippingRequest = [
                {
                    basket_id: randomInt,
                    product_type: 2,
                    product_size: 1, // this param is ignored on api for gifts
                    product_quantity: 1,
                    address: {
                        line: addressObject.address1 + ' ' + addressObject.address2 + ' ' + addressObject.city + ' ' + addressObject.province,
                        postcode: addressObject.zip,
                        country: countryToCode(addressObject.country)
                    },
                    attached_products: []
                }
            ]

            if (item.properties['Send On Date']) {
                shippingRequest[0].send_on_date = item.properties['Send On Date']
            }

            options = yield call(getDeliveryOptions, shippingRequest)
        }

        //add gift product with reference
        let newGiftProperties = {}
        newGiftProperties['_gift_line'] = randomInt
        if (item.properties['Send On Date']) {
            newGiftProperties['Send On Date'] = item.properties['Send On Date']
        }

        if (item.properties['_shipping_address']) {
            newGiftProperties['_shipping_address'] = item.properties['_shipping_address']
        }

        if (item.properties['Shipping address']) {
            const addressObject = JSON.parse(item.properties['_shipping_address'])

            newGiftProperties['Shipping address'] = `${addressObject.firstName} ${addressObject.lastName}, ${addressObject.address1}, 
            ${addressObject.address2 ? addressObject.address2 + ',' : ''} ${addressObject.city}, 
            ${addressObject.province ? addressObject.province + ',' : ''} ${addressObject.country}, 
            ${addressObject.zip}, ${addressObject.phone ? addressObject.phone + ',' : ''} ${addressObject.addressType}`
        }

        if (options[0]) {
            newGiftProperties['_shipping_id'] = options[0].delivery_options[0].delivery_id
            newGiftProperties['_shipping_name'] = options[0].delivery_options[0].delivery_name
            newGiftProperties['_delivery_description'] = options[0].delivery_options[0].delivery_description
            newGiftProperties['_delivery_price'] = options[0].delivery_options[0].delivery_price

            const delivery_from = new Date(options[0].delivery_options[0].deliverFrom)
            const delivery_to = new Date(options[0].delivery_options[0].deliverTo)

            newGiftProperties['Delivery from'] = `${delivery_from.getDate()}/${delivery_from.getMonth() + 1}/${delivery_from.getFullYear()}`
            newGiftProperties['Delivery to'] = `${delivery_to.getDate()}/${delivery_to.getMonth() + 1}/${delivery_to.getFullYear()}`
        }

        const newGiftItem = {
            id: variantId,
            quantity: 1,
            properties: newGiftProperties
        }

        yield call(addItem, newGiftItem)

        yield put(apiGetCartContent())
    } catch (e) {
        console.log('api error --> apiAttachGiftToCardSaga')
    }
}

function* apiAttachGiftToCardSaga() {
    yield takeEvery(apiAttachGiftToCard, fetchAddAddressAndDefaultShippingCall)
}

export default apiAttachGiftToCardSaga
