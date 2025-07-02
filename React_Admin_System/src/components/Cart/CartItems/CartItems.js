import React, { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { calculateShippingTotal,getDeliveryOptions } from '../../../middlewares/api'
import { apiChangeCartItemQuantity,apiGetAddresses } from '../../../store/actions'
import { countryToCode } from '../../../helpers/countryToCode'
import './CartItems.css'
import addGift from '../../../svg/add_gift.jpg'
import IconRemove from '../../../svg/IconRemove'
import Quantity from './Quantity'
import AddressModalContent from '../CartModal/AddressModalContent/AddressModalContent'
import PostageModalContent from '../CartModal/PostageModalContent/PostageModalContent'
import GiftModalContent from '../CartModal/GiftModalContent/GiftModalContent'
import { formatCurrency } from '../../../helpers/formatCurrency'

const CartItems = ({ groups, customerName, isLoggedIn, cartContent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPostageModalOpen, setIsPostageModalOpen] = useState(false)
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(false)
    const dispatch = useDispatch()

    const getAddresses = (properties) => {
        const addressObject = Object.hasOwn(properties, '_shipping_address') ? JSON.parse(properties['_shipping_address']) : null

        return addressObject ? (
            <>
                {addressObject.firstName || addressObject.lastName ? addressObject.firstName + ' ' + addressObject.lastName + ', ' : null}
                {addressObject.zip && addressObject.zip}
            </>
        ) : null
    }

    const getMessage = (properties) => {
        const messageObject = Object.hasOwn(properties, '_json_editor_state') ? "Preview Card" : "Add Message"

        return messageObject;
    }

    const getExpectedDelivery = (properties) => {
        const from = Object.hasOwn(properties, 'Delivery from') ? properties['Delivery from'] : null
        const to = Object.hasOwn(properties, 'Delivery to') ? properties['Delivery to'] : null
        if (from === null && to === null) return
        return from === to ? (
            <>
                Estimated delivery: {from}
                <br />
            </>
        ) : (
            <>
                Estimated delivery: {from} to {to} <br />
            </>
        )
    }

    const previewCard = (item, key, redirectUrl, editorState) => {
        sessionStorage.setItem('editor_item_key', key)
        sessionStorage.setItem('editor_variant_id', item.variant_id)
        sessionStorage.setItem('editor_state', editorState ? editorState : '{}')
        sessionStorage.setItem('editor_properties', item.properties ? JSON.stringify(item.properties) : '{}')
        sessionStorage.setItem('editor_quantity', item.quantity)

        window.location = redirectUrl
    }

    const showAddressModal = (item) => {
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    const showPostageModal = (item) => {
        setSelectedItem(item)
        setIsPostageModalOpen(true)
    }

    const showGiftsModal = (item) => {
        setSelectedItem(item)
        setIsGiftModalOpen(true)
    }

    const removeGift = (item) => {
        dispatch(apiChangeCartItemQuantity({ itemKey: null, itemQuantity: null, giftKey: item.gift.key, giftQuantity: 0 }))
    }

    const removeItem = (item) => {
        if (item.gift) {
            dispatch(apiChangeCartItemQuantity({ itemKey: item.key, itemQuantity: 0, giftKey: item.gift.key, giftQuantity: 0 }))
        } else {
            dispatch(apiChangeCartItemQuantity({ itemKey: item.key, itemQuantity: 0, giftKey: null, giftQuantity: null }))
        }
    }

    const displayGiftBanner = (item) => {
        let banner = null
        const addressObject = Object.hasOwn(item.properties, '_shipping_address') ? JSON.parse(item.properties['_shipping_address']) : null

        if (item.product_type === 'Cards' && !item.gift && (addressObject === null || addressObject.country === 'United Kingdom')) {
            banner = (
                  <button className="cart-add-gift-button" onClick={() => showGiftsModal(item)}>

                    <img src={addGift} alt='Logo' />
                </button>
                
            )
        }

        return banner
    }

     let defaultShippingAddress,defaultPostage,defaultDeliveryFrom,defaultDeliveryTo = null;

    // First pass to find the default shipping address

    groups.forEach(group => {

        group.forEach(item => {

            if (Object.hasOwn(item.properties, "_shipping_address") && !defaultShippingAddress) {

                defaultShippingAddress = item.properties._shipping_address;

            }

            if (Object.hasOwn(item.properties, "_shipping_name") && !defaultPostage) {

                defaultPostage = item.properties._shipping_name;

            }

            if (Object.hasOwn(item.properties, "Delivery from") && !defaultDeliveryFrom) {

                defaultDeliveryFrom = item.properties["Delivery from"];

            }

            if (Object.hasOwn(item.properties, "Delivery to") && !defaultDeliveryTo) {

                defaultDeliveryTo = item.properties["Delivery to"];

            }

        });

    });



    // Second pass to assign the default shipping address if not present

    groups.forEach(group => {

        group.forEach(item => {           

            if (!Object.hasOwn(item.properties, "_shipping_address") && defaultShippingAddress) {

                item.properties._shipping_address = defaultShippingAddress;

            }

            if (!Object.hasOwn(item.properties, "_shipping_name") && defaultPostage) {

                item.properties._shipping_name = defaultPostage;

            }

            if (!Object.hasOwn(item.properties, "Delivery from") && defaultDeliveryFrom) {

                item.properties["Delivery from"] = defaultDeliveryFrom;

            }

            if (!Object.hasOwn(item.properties, "Delivery to") && defaultDeliveryTo) {

                item.properties["Delivery to"] = defaultDeliveryTo;

            }

            

        });

    });



    return (
        <div className='cart-items-wrapper'>
            {isModalOpen && <AddressModalContent setIsModalOpen={setIsModalOpen} item={selectedItem} customerName={customerName} isLoggedIn={isLoggedIn} cartContent={cartContent} />}
            {isPostageModalOpen && <PostageModalContent setIsPostageModalOpen={setIsPostageModalOpen} item={selectedItem} />}
            {isGiftModalOpen && <GiftModalContent setIsGiftModalOpen={setIsGiftModalOpen} item={selectedItem} />}

            {groups.map((group) =>
                group.map((item, index) => (
                    <div key={index} className='cart-item-wrapper'>
                        <div className='cart-item'>
                            <div className='cart-item-image'>
                                <img src={ item.properties && item.properties && item.properties && item.properties["_printessThumbnail"] ? item.properties["_printessThumbnail"] : item.image} alt={item.title} loading='lazy' />
                            </div>
                            <div className='cart-item-details-wrapper'>
                                <div className='cart-item-details'>
                                    <div className='cart-item-properties'>
                                        Delivering to: {getAddresses(item.properties)}
                                        <br />
                                        Postage: {item.properties._shipping_name && <>{item.properties._shipping_name}</>}
                                        <br />
                                        {item.properties['Send On Date'] && (
                                            <>
                                                Send On Date: {item.properties['Send On Date']}
                                                <br />
                                            </>
                                        )}
                                        {getExpectedDelivery(item.properties)}
                                    </div>
                                    <div className='cart-item-price-quantity-wrapper'>
                                        {item.price != item.final_price ? (
                                            <>
                                                <div className='cart-item-price'>Price: {formatCurrency(item.final_price)}</div>
                                                <div className='cart-item-price-old'>{formatCurrency(item.price)}</div>
                                            </>
                                        ) : (
                                            <div className='cart-item-price'>Price: {formatCurrency(item.price)}</div>
                                        )}
                                        <div className='cart-item-quantity'>
                                            <div className='cart-item-quantity-label'>Quantity:</div>
                                            <Quantity item={item} />
                                        </div>
                                    </div>
                                </div>
                                <div className='cart-item-actions-wrapper'>
                                    { item.properties && item.properties["_printessSaveToken"] ? (
                                        <>
                                            <button
                                                className='cart-item-preview-button'
                                                onClick={() => { if(typeof window["printessShowEditorForItem"] === "function")window.printessShowEditorForItem(item);  }}
                                            >
                                                Edit
                                            </button>
                                        </>) : null
                                    }
                                    {!(item.properties && item.properties["_printessSaveToken"]) && item.product_type === 'Cards' ? (
                                        <>
                                            <button
                                            className='cart-item-preview-button'
                                            onClick={() => previewCard(item, item.key, item.url, item.properties._json_editor_state)}
                                            >
                                                {getMessage(item.properties)}
                                            </button>
                                        </>
                                    ) : null }

                                    <button className='cart-item-add-address-button' onClick={() => showAddressModal(item)}>
                                        {item.properties['_shipping_address'] ? 'Change Address' : 'Add Address'}
                                    </button>
                                    {item.properties['_shipping_address'] && (
                                        <button className='cart-item-add-address-button' onClick={() => showPostageModal(item)}>
                                            Change Postage
                                        </button>
                                    )}
                                    <button className='cart-item-remove' onClick={() => removeItem(item)}>
                                        <IconRemove width={32} height={32} color='#000000' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {item.gift && (
                            <div className='cart-gift-item'>
                                <div className='cart-gift-item-image'>
                                    <img src={item.gift.image} alt={item.gift.title} loading='lazy' />
                                </div>
                                <div className='cart-gift-item-properties'>
                                    {item.gift.title}
                                    <br />
                                    Quantity: {item.gift.quantity}
                                    <br />
                                    {item.gift.properties._shipping_name && (
                                        <>
                                            Postage: {item.gift.properties._shipping_name}
                                            <br />
                                        </>
                                    )}
                                    {item.gift.properties['Send On Date'] && (
                                        <>
                                            Send On Date: {item.gift.properties['Send On Date']}
                                            <br />
                                        </>
                                    )}
                                    {getExpectedDelivery(item.gift.properties)}
                                </div>
                                <div className='cart-gift-item-price-remove'>
                                    {item.gift.price != item.gift.final_price ? (
                                        <div>
                                            <div className='cart-gift-item-price'>Price: {formatCurrency(item.gift.final_price)}</div>
                                            <div className='cart-gift-item-price-old'>{formatCurrency(item.gift.price)}</div>
                                        </div>
                                    ) : (
                                        <div className='cart-gift-item-price'>Price: {formatCurrency(item.gift.price)}</div>
                                    )}
                                    <button className='cart-gift-item-remove' onClick={() => removeGift(item)}>
                                        Remove Gift
                                        <IconRemove width={26} height={26} color='#000000' />
                                    </button>
                                </div>
                            </div>
                        )}
                        {displayGiftBanner(item)}
                    </div>
                ))
            )}
        </div>
    )
}

export default CartItems

CartItems.propTypes = {
    groups: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    customerName: PropTypes.string,
    cartContent: PropTypes.object.isRequired
}