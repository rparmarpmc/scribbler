import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './PostageModalContent.css'
import { getDeliveryOptions } from '../../../../middlewares/api'
import { apiAddPostageAndDelayedDelivery } from '../../../../store/actions'
import { countryToCode } from '../../../../helpers/countryToCode'
import CalendarIcon from '../../../../svg/CalendarIcon'
import Postage1ClassIcon from '../../../../svg/Postage1ClassIcon'
import PostageSaturdayIcon from '../../../../svg/PostageSaturdayIcon'
import PostageSpecialIcon from '../../../../svg/PostageSpecialIcon'
import { convertFormatCurrency } from '../../../../helpers/formatCurrency'
import SendOnDateModalContent from '../SendOnDateModalContent/SendOnDateModalContent'

const PostageModalContent = ({ item, setIsPostageModalOpen }) => {
    const dispatch = useDispatch()
    const [isSendOnDateModalOpen, setIsSendOnDateModalOpen] = useState(false)

    const [sendOnDate, setSendOnDate] = useState()

    const [options, setOptions] = useState([])
    const [giftOptions, setGiftOptions] = useState([])

    const [shippingId, setShippingId] = useState(1)
    const [shippingName, setShippingName] = useState()
    const [deliveryFrom, setDeliveryFrom] = useState()
    const [deliveryTo, setDeliveryTo] = useState()
    const [deliveryDescription, setDeliveryDescription] = useState()
    const [deliveryPrice, setDeliveryPrice] = useState()

    const [giftShippingId, setGiftShippingId] = useState(1)
    const [giftShippingName, setGiftShippingName] = useState()
    const [giftDeliveryFrom, setGiftDeliveryFrom] = useState()
    const [giftDeliveryTo, setGiftDeliveryTo] = useState()
    const [giftDeliveryDescription, setGiftDeliveryDescription] = useState()
    const [giftDeliveryPrice, setGiftDeliveryPrice] = useState()

    const deliveryDescriptionsArray = [
        'Royal Mail First Class delivery is estimated to take between 1-3 working days.',
        'Guaranteed next working day, if you place your order before 3pm Monday–Thursday excluding UK Bank Holidays*.',
        'Guaranteed Saturday delivery, if you place your order before 3pm on Friday excluding UK Bank Holidays*.',
        'Royal Mail Airmail currently takes up to 3-5 working days to EU destinations.*',
        'Royal Mail Airmail currently takes up to 5-7 working days to non-EU destinations.*'
    ]

    useEffect(() => {
        document.body.classList.add('no-scroll')
        getShippingOptions(item)

        setSendOnDate(item.properties['Send On Date'])
        setShippingId(parseInt(item.properties._shipping_id))
        setShippingName(item.properties._shipping_name)
        setDeliveryFrom(item.properties['Delivery from'])
        setDeliveryTo(item.properties['Delivery to'])
        setDeliveryDescription(item.properties._delivery_description)
        setDeliveryPrice(item.properties._delivery_price)
        if (item.gift) {
            setGiftShippingId(parseInt(item.gift.properties._shipping_id))
            setGiftShippingName(item.gift.properties._shipping_name)
            setGiftDeliveryFrom(item.gift.properties['Delivery from'])
            setGiftDeliveryTo(item.gift.properties['Delivery to'])
            setGiftDeliveryDescription(item.gift.properties._delivery_description)
            setGiftDeliveryPrice(item.gift.properties._delivery_price)
        }
    }, [])

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

    const getShippingOptions = async (item, newSendOnDate = null) => {
        const addressDetails = JSON.parse(item.properties['_shipping_address'])
        const shippingRequest = [
            {
                basket_id: item.key,
                product_type: product_type(item.product_type),
                product_size: item.variant_title && item.variant_title.includes('Large') ? 2 : 1, // 2 for large cards and 1 small cards
                product_quantity: item.quantity,
                address: {
                    line: addressDetails.address1 + ' ' + addressDetails.address2 + ' ' + addressDetails.city + ' ' + addressDetails.province,
                    postcode: addressDetails.zip,
                    country: countryToCode(addressDetails.country)
                },
                attached_products: []
            }
        ]

        if (newSendOnDate) {
            shippingRequest[0].send_on_date = newSendOnDate
        }

        if (item.gift) {
            shippingRequest.push({
                basket_id: item.gift.key,
                product_type: product_type(item.gift.product_type),
                product_size: 1, // this param is ignored on api for gifts
                product_quantity: item.gift.quantity,
                address: {
                    line: addressDetails.address1 + ' ' + addressDetails.address2 + ' ' + addressDetails.city + ' ' + addressDetails.province,
                    postcode: addressDetails.zip,
                    country: countryToCode(addressDetails.country)
                },
                attached_products: []
            })

            if (newSendOnDate) {
                shippingRequest[1].send_on_date = newSendOnDate
            }
        }

        const options = await getDeliveryOptions(shippingRequest)

        setOptions(options[0].delivery_options)

        if (newSendOnDate) {
            setSendOnDate(newSendOnDate)

            const selectedItemShipping = options[0].delivery_options.filter((item) => item.delivery_id === shippingId)

            const delivery_from = new Date(selectedItemShipping[0].deliverFrom)
            const delivery_to = new Date(selectedItemShipping[0].deliverTo)

            setDeliveryFrom(`${delivery_from.getDate()}/${delivery_from.getMonth() + 1}/${delivery_from.getFullYear()}`)
            setDeliveryTo(`${delivery_to.getDate()}/${delivery_to.getMonth() + 1}/${delivery_to.getFullYear()}`)
        }

        if (item.gift) {
            setGiftOptions(options[1].delivery_options)
            if (newSendOnDate) {
                const selectedItemShipping = options[1].delivery_options.filter((item) => item.delivery_id === giftShippingId)

                const delivery_from = new Date(selectedItemShipping[0].deliverFrom)
                const delivery_to = new Date(selectedItemShipping[0].deliverTo)

                setGiftDeliveryFrom(`${delivery_from.getDate()}/${delivery_from.getMonth() + 1}/${delivery_from.getFullYear()}`)
                setGiftDeliveryTo(`${delivery_to.getDate()}/${delivery_to.getMonth() + 1}/${delivery_to.getFullYear()}`)
            }
        }
    }

    const changeSendOnDate = (newSendOnDate) => {
        if (newSendOnDate) {
            getShippingOptions(item, newSendOnDate)
        }
    }

    const selectShipping = (option) => {
        setShippingId(parseInt(option.delivery_id))
        setShippingName(option.delivery_name)
        setDeliveryDescription(deliveryDescriptionsArray[option.delivery_id - 1])
        setDeliveryPrice(option.delivery_price)

        const delivery_from = new Date(option.deliverFrom)
        const delivery_to = new Date(option.deliverTo)

        setDeliveryFrom(`${delivery_from.getDate()}/${delivery_from.getMonth() + 1}/${delivery_from.getFullYear()}`)
        setDeliveryTo(`${delivery_to.getDate()}/${delivery_to.getMonth() + 1}/${delivery_to.getFullYear()}`)
    }

    const selectGiftShipping = (option) => {
        setGiftShippingId(parseInt(option.delivery_id))
        setGiftShippingName(option.delivery_name)
        setGiftDeliveryDescription(deliveryDescriptionsArray[option.delivery_id - 1])
        setGiftDeliveryPrice(option.delivery_price)

        const delivery_from = new Date(option.deliverFrom)
        const delivery_to = new Date(option.deliverTo)

        setGiftDeliveryFrom(`${delivery_from.getDate()}/${delivery_from.getMonth() + 1}/${delivery_from.getFullYear()}`)
        setGiftDeliveryTo(`${delivery_to.getDate()}/${delivery_to.getMonth() + 1}/${delivery_to.getFullYear()}`)
    }

    const saveChanges = () => {
        let properties = Object.assign({}, item.properties)
        let giftProperties = null
        if (sendOnDate) {
            properties['Send On Date'] = sendOnDate
        }
        properties['_shipping_id'] = shippingId
        properties._shipping_name = shippingName
        properties._delivery_description = deliveryDescription
        properties._delivery_price = deliveryPrice
        properties['Delivery from'] = deliveryFrom
        properties['Delivery to'] = deliveryTo

        if (item.gift) {
            giftProperties = Object.assign({}, item.gift.properties)
            if (sendOnDate) {
                giftProperties['Send On Date'] = sendOnDate
            }
            giftProperties['_shipping_id'] = giftShippingId
            giftProperties._shipping_name = giftShippingName
            giftProperties._delivery_description = giftDeliveryDescription
            giftProperties._delivery_price = giftDeliveryPrice
            giftProperties['Delivery from'] = giftDeliveryFrom
            giftProperties['Delivery to'] = giftDeliveryTo
        }

        if (item.gift) {
            dispatch(apiAddPostageAndDelayedDelivery({ quantity: item.quantity, key: item.key, properties: properties, giftQuantity: item.gift.quantity, giftKey: item.gift.key, giftProperties: giftProperties }))
        } else {
            dispatch(apiAddPostageAndDelayedDelivery({ quantity: item.quantity, key: item.key, properties: properties, giftQuantity: null, giftKey: null, giftProperties: null }))
        }

        document.body.classList.remove('no-scroll')
        setIsPostageModalOpen(false)
    }

    return (
        <div
            className='postage-modal-backdrop'
            onClick={() => {
                document.body.classList.remove('no-scroll')
                setIsPostageModalOpen(false)
            }}
        >
            <div className='postage-modal-wrapper' onClick={(e) => e.stopPropagation()}>
                {isSendOnDateModalOpen && <SendOnDateModalContent setIsSendOnDateModalOpen={setIsSendOnDateModalOpen} sendOnDate={sendOnDate} changeSendOnDate={changeSendOnDate} />}
                <div className='cart-postage-modal-header'>Postage</div>
                <div className='cart-postage-modal-content'>
                    {!isSendOnDateModalOpen &&
                        options.length > 0 &&
                        options.map((option, index) => {
                            return (
                                <button key={index} className={`cart-postage-modal-option-button ${shippingId === option.delivery_id ? 'selected' : ''}`} onClick={() => selectShipping(option)}>
                                    <div className='cart-postage-modal-icon'>
                                        {option.delivery_id === 1 && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                        {option.delivery_id === 2 && <PostageSpecialIcon width={71} height={46} color={'black'} />}
                                        {option.delivery_id === 3 && <PostageSaturdayIcon width={69} height={46} color={'black'} />}
                                        {option.delivery_id === 4 && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                        {![1, 2, 3, 4].includes(option.delivery_id) && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                    </div>
                                    <div className='cart-postage-modal-description'>
                                        <div className='cart-postage-modal-description-title'>{option.delivery_name}</div>
                                        <div className='cart-postage-modal-description-info'>{deliveryDescriptionsArray[option.delivery_id - 1]}</div>
                                        {(option.delivery_id === 2 || option.delivery_id === 3) && <div className='cart-postage-modal-description-notice'>* A signature is required for this service</div>}
                                    </div>
                                    <div className='cart-postage-modal-price'>{convertFormatCurrency(option.delivery_price * 100)}</div>
                                </button>
                            )
                        })}
                </div>
                {!isSendOnDateModalOpen && giftOptions.length > 0 && <div className='cart-postage-modal-header'>Gift Postage</div>}
                <div className='cart-postage-modal-content'>
                    {giftOptions.length > 0 &&
                        giftOptions.map((option, index) => {
                            return (
                                <button key={index} className={`cart-postage-modal-option-button ${giftShippingId === option.delivery_id ? 'selected' : ''}`} onClick={() => selectGiftShipping(option)}>
                                    <div className='cart-postage-modal-icon'>
                                        {option.delivery_id === 1 && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                        {option.delivery_id === 2 && <PostageSpecialIcon width={71} height={46} color={'black'} />}
                                        {option.delivery_id === 3 && <PostageSaturdayIcon width={69} height={46} color={'black'} />}
                                        {option.delivery_id === 4 && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                        {![1, 2, 3, 4].includes(option.delivery_id) && <Postage1ClassIcon width={55} height={64} color={'black'} />}
                                    </div>
                                    <div className='cart-postage-modal-description'>
                                        <div className='cart-postage-modal-description-title'>{option.delivery_name}</div>
                                        <div className='cart-postage-modal-description-info'>{deliveryDescriptionsArray[option.delivery_id - 1]}</div>
                                        {(option.delivery_id === 2 || option.delivery_id === 3) && <div className='cart-postage-modal-description-notice'>* A signature is required for this service</div>}
                                    </div>
                                    <div className='cart-postage-modal-price'>{convertFormatCurrency(option.delivery_price * 100)}</div>
                                </button>
                            )
                        })}
                </div>
                <div className='cart-send-on-date'>
                    I would like my order to be shipped on:
                    <div className='cart-send-on-date-display' onClick={() => setIsSendOnDateModalOpen(true)}>
                        {sendOnDate ? sendOnDate : 'Send On Date'}
                        <CalendarIcon width={20} height={20} color={'black'} />
                    </div>
                </div>

                <div className='cart-postage-modal-footer'>
                    <button
                        className='cart-postage-modal-cancel-button'
                        onClick={() => {
                            document.body.classList.remove('no-scroll')
                            setIsPostageModalOpen(false)
                        }}
                    >
                        Cancel
                    </button>
                    <button className='cart-postage-modal-confirm-button' onClick={() => saveChanges()}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostageModalContent

PostageModalContent.propTypes = {
    item: PropTypes.object.isRequired,
    setIsPostageModalOpen: PropTypes.func.isRequired
}
