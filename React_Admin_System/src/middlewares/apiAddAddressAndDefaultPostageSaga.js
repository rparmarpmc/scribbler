import { call, put, takeEvery } from 'redux-saga/effects'

import { getDeliveryOptions, saveItemChange, changeCartQuantity } from './api'
import { countryToCode } from '../helpers/countryToCode'
import { apiAddAddressAndDefaultPostage, apiGetCartContentSuccess } from '../store/actions'

function* fetchAddAddressAndDefaultShippingCall({ payload: { item, address } }) {
    try {
        let response = {}
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

        let shippingRequest = [
            {
                basket_id: item.key,
                product_type: product_type(item.product_type),
                product_size: item.variant_title && item.variant_title.includes('Large') ? 2 : 1, // 2 for large cards and 1 small cards
                product_quantity: item.quantity,
                address: {
                    line: address.address1 + ' ' + address.address2 + ' ' + address.city + ' ' + address.province,
                    postcode: address.zip,
                    country: countryToCode(address.country)
                },
                attached_products: []
            }
        ]

        if (item.gift && countryToCode(address.country) === 'GB') {
            shippingRequest.push({
                basket_id: item.gift.key,
                product_type: 2, //1-cards 2-gifts only gift could be attached
                product_size: 1,
                product_quantity: item.gift.quantity,
                address: {
                    line: address.address1 + ' ' + address.address2 + ' ' + address.city + ' ' + address.province,
                    postcode: address.zip,
                    country: countryToCode(address.country)
                },
                attached_products: []
            })
        } else if (item.gift) {
            //we don't send gift items outside of UK so it needs removing
            response = yield call(changeCartQuantity, null, null, item.gift.key, 0)
        }

        const shippingOptions = yield call(getDeliveryOptions, shippingRequest)

        if (shippingOptions[0]) {
            const properties = item.properties
            properties['_shipping_id'] = shippingOptions[0].delivery_options[0].delivery_id
            properties['_shipping_name'] = shippingOptions[0].delivery_options[0].delivery_name

            if (shippingOptions[0]?.delivery_options[0]?.deliverFrom !== shippingOptions[0]?.delivery_options[0]?.deliverTo) {
                const deliveryFrom = new Date(shippingOptions[0].delivery_options[0].deliverFrom)
                const deliveryTo = new Date(shippingOptions[0].delivery_options[0].deliverTo)
                properties['Delivery from'] = `${deliveryFrom.getDate()}/${deliveryFrom.getMonth() + 1}/${deliveryFrom.getFullYear()}`
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            } else {
                delete properties['Delivery from']
                const deliveryTo = new Date(shippingOptions[0].delivery_options[0].deliverTo)
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            }

            if (shippingOptions[0]?.delivery_options[0]?.delivery_description) {
                properties['_delivery_description'] = shippingOptions[0].delivery_options[0].delivery_description
            }

            if (shippingOptions[0]?.delivery_options[0]?.delivery_price) {
                properties['_delivery_price'] = shippingOptions[0].delivery_options[0].delivery_price
            }

            properties['_shipping_address'] = JSON.stringify(address)
            properties['Shipping address'] = `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${
                address.zip
            }, ${address.phone ? address.phone + ',' : ''} ${address.addressType}`

            response = yield call(saveItemChange, item.quantity, item.key, properties)

            if (response.length === 0) {
                console.log('Problem with setting product shipping properties')
                return
            }
        }

        if (shippingOptions[1] && item.gift) {
            const properties = item.gift.properties
            properties['_shipping_id'] = shippingOptions[1].delivery_options[0].delivery_id
            properties['_shipping_name'] = shippingOptions[1].delivery_options[0].delivery_name

            if (shippingOptions[1]?.delivery_options[0]?.deliverFrom !== shippingOptions[1]?.delivery_options[0]?.deliverTo) {
                const deliveryFrom = new Date(shippingOptions[1].delivery_options[0].deliverFrom)
                const deliveryTo = new Date(shippingOptions[1].delivery_options[0].deliverTo)
                properties['Delivery from'] = `${deliveryFrom.getDate()}/${deliveryFrom.getMonth() + 1}/${deliveryFrom.getFullYear()}`
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            } else {
                delete properties['Delivery from']
                const deliveryTo = new Date(shippingOptions[1].delivery_options[0].deliverTo)
                properties['Delivery to'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
            }

            if (shippingOptions[1]?.delivery_options[0]?.delivery_description) {
                properties['_delivery_description'] = shippingOptions[1].delivery_options[0].delivery_description
            }

            if (shippingOptions[1]?.delivery_options[0]?.delivery_price) {
                properties['_delivery_price'] = shippingOptions[1].delivery_options[0].delivery_price
            }

            properties['_shipping_address'] = JSON.stringify(address)
            properties['Shipping address'] = `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${
                address.zip
            }, ${address.phone ? address.phone + ',' : ''} ${address.addressType}`

            response = yield call(saveItemChange, item.gift.quantity, item.gift.key, properties)

            if (response.length === 0) {
                console.log('Problem with setting gift product shipping properties')
                return
            }
        }

        yield put(apiGetCartContentSuccess(response))
    } catch (e) {
        console.log('api error --> apiAddAddressAndDefaultPostageSaga')
    }
}

function* apiAddAddressAndDefaultPostageSaga() {
    yield takeEvery(apiAddAddressAndDefaultPostage, fetchAddAddressAndDefaultShippingCall)
}

export default apiAddAddressAndDefaultPostageSaga
