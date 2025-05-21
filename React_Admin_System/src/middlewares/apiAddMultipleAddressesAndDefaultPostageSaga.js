import { call, put, takeEvery, select } from 'redux-saga/effects'

import { getDeliveryOptions, saveItemByVariantId, removeMultiItems, clearCart, getCartContent } from './api'
import { countryToCode } from '../helpers/countryToCode'
import { apiAddMultipleAddressesAndDefaultPostage, apiGetCartContentSuccess } from '../store/actions'

function* fetchAddMultiAddressAndDefaultShippingCall({ payload: { address } }) {
    const cartContent = yield select((state) => state.cartContent)

    const product_type = (type) => {
        switch (type) {
            case 'Cards':
                return 1
            case 'Gifts':
                return 2
            case 'Alcohol':
                return 3
            default:
                return 1
        }
    }

    try {
        let cart = Object.assign({}, cartContent)

        const keysToRemove = cart.items.filter((item) => {
            if (Object.hasOwn(item.properties, '_gift_line') && countryToCode(address.country) !== 'GB') {
                return true
            } else {
                return false
            }
        })

        if (keysToRemove.length > 0) {
            cart = yield call(removeMultiItems, keysToRemove)
        }

        let shippingRequest = []

        cart.items.map((item) => {
            shippingRequest.push({
                basket_id: item.key,
                product_type: product_type(item.product_type),
                product_size: 1,
                product_quantity: item.quantity,
                address: {
                    line: address.address1 + ' ' + address.address2 + ' ' + address.city + ' ' + address.province,
                    postcode: address.zip,
                    country: countryToCode(address.country)
                },
                attached_products: []
            })
        })

        const shipping = yield call(getDeliveryOptions, shippingRequest)

        const newItems = cart.items.map((item, index) => {
            const properties = item.properties
            properties['_shipping_id'] = shipping[index].delivery_options[0].delivery_id
            properties['_shipping_name'] = shipping[index].delivery_options[0].delivery_name

            if (shipping[index]?.delivery_options[0]?.deliverFrom !== shipping[index]?.delivery_options[0]?.deliverTo) {
                const deliveryFrom = new Date(shipping[index].delivery_options[0].deliverFrom)
                const deliveryTo = new Date(shipping[index].delivery_options[0].deliverTo)
                properties['Delivery from'] = `${deliveryFrom.getDate()}/${deliveryFrom.getMonth() + 1}/${deliveryFrom.getFullYear()}`
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            } else {
                delete properties['Delivery from']
                const deliveryTo = new Date(shipping[index].delivery_options[0].deliverTo)
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            }

            if (shipping[index]?.delivery_options[0]?.delivery_description) {
                properties['_delivery_description'] = shipping[index].delivery_options[0].delivery_description
            }

            if (shipping[index]?.delivery_options[0]?.delivery_price) {
                properties['_delivery_price'] = shipping[index].delivery_options[0].delivery_price
            }

            properties['_shipping_address'] = JSON.stringify(address)
            properties['Shipping address'] = `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${
                address.zip
            }, ${address.phone ? address.phone + ',' : ''} ${address.addressType}`

            return { quantity: item.quantity, id: item.variant_id, properties: properties }
        })

        yield call(clearCart)

        yield call(saveItemByVariantId, newItems)

        const response = yield call(getCartContent)

        yield put(apiGetCartContentSuccess(response))
    } catch (e) {
        console.log('api error --> apiAddMultipleAddressesAndDefaultPostageSaga')
    }
}

function* apiAddMultipleAddressesAndDefaultPostageSaga() {
    yield takeEvery(apiAddMultipleAddressesAndDefaultPostage, fetchAddMultiAddressAndDefaultShippingCall)
}

export default apiAddMultipleAddressesAndDefaultPostageSaga
