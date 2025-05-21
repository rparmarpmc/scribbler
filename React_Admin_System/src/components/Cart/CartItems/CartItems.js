import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
 
import './CartItems.css'
import addGift from '../../../svg/add_gift.jpg'
import IconRemove from '../../../svg/IconRemove'
import Quantity from './Quantity'
import AddressModalContent from '../CartModal/AddressModalContent/AddressModalContent'
import PostageModalContent from '../CartModal/PostageModalContent/PostageModalContent'
import GiftModalContent from '../CartModal/GiftModalContent/GiftModalContent'
import { formatCurrency } from '../../../helpers/formatCurrency'
import { apiChangeCartItemQuantity } from '../../../store/actions'
 
const CartItems = ({ groups, customerName, isLoggedIn, cartContent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPostageModalOpen, setIsPostageModalOpen] = useState(false)
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const dispatch = useDispatch()
 
    const getAddresses = (properties) => {
        try {
            const addressObject = properties?._shipping_address ? JSON.parse(properties._shipping_address) : null
            return addressObject ? (
                <>
                    {addressObject.firstName || addressObject.lastName ? `${addressObject.firstName} ${addressObject.lastName}, ` : null}
                    {addressObject.zip}
                </>
            ) : null
        } catch {
            return null
        }
    }
 
    const getMessage = (properties) => {
        return properties?._json_editor_state ? 'Preview Card' : 'Add Message'
    }
 
    const getExpectedDelivery = (properties) => {
        const from = properties?.['Delivery from']
        const to = properties?.['Delivery to']
        if (!from && !to) return null
        return (
            <>
                Estimated delivery: {from === to ? from : `${from} to ${to}`} <br />
            </>
        )
    }
 
    const previewCard = (item, key, redirectUrl, editorState) => {
        sessionStorage.setItem('editor_item_key', key)
        sessionStorage.setItem('editor_variant_id', item.variant_id)
        sessionStorage.setItem('editor_state', editorState || '{}')
        sessionStorage.setItem('editor_properties', JSON.stringify(item.properties || {}))
        sessionStorage.setItem('editor_quantity', item.quantity)
        window.location = redirectUrl
    }
 
    const showModal = (setter, item) => {
        setSelectedItem(item)
        setter(true)
    }
 
    const removeItem = (item) => {
        dispatch(apiChangeCartItemQuantity({
            itemKey: item.key,
            itemQuantity: 0,
            giftKey: item.gift?.key || null,
            giftQuantity: item.gift ? 0 : null,
        }))
    }
 
    const removeGift = (item) => {
        dispatch(apiChangeCartItemQuantity({
            itemKey: null,
            itemQuantity: null,
            giftKey: item.gift.key,
            giftQuantity: 0,
        }))
    }
 
    const displayGiftBanner = (item) => {
        try {
            const addressObject = item?.properties?._shipping_address ? JSON.parse(item.properties._shipping_address) : null
            const showBanner = item.product_type === 'Cards' && !item.gift && (!addressObject || addressObject.country === 'United Kingdom')
 
            return showBanner ? (
                <button className="gift-modal-button" onClick={() => showModal(setIsGiftModalOpen, item)}>
                    <div className="gift-modal-button__container">
                        <div className="gift-modal-button__content">
                            <span className="gift-modal-button__text">Looking for a perfect gift?</span>
                            <img
                                src="https://img.icons8.com/ios-filled/50/000000/gift.png"
                                alt="Gift Icon"
                                className="gift-modal-button__icon"
                            />
                        </div>
                    </div>
                </button>
            ) : null
        } catch {
            return null
        }
    }
 
    return (
        <div className='cart-items-wrapper'>
            {isModalOpen && (
                <AddressModalContent
                    setIsModalOpen={setIsModalOpen}
                    item={selectedItem}
                    customerName={customerName}
                    isLoggedIn={isLoggedIn}
                    cartContent={cartContent}
                />
            )}
            {isPostageModalOpen && (
                <PostageModalContent
                    setIsPostageModalOpen={setIsPostageModalOpen}
                    item={selectedItem}
                />
            )}
            {isGiftModalOpen && (
                <GiftModalContent
                    setIsGiftModalOpen={setIsGiftModalOpen}
                    item={selectedItem}
                />
            )}
 
            {groups.map((group) =>
                group.map((item) => (
                    <div key={item.key} className='cart-item-wrapper'>
                        <div className='cart-item'>
                            <div className='cart-item-image'>
                                <img
                                    src={item.properties?._printessThumbnail || item.image}
                                    alt={item.title}
                                    loading='lazy'
                                />
                            </div>
                            <div className='cart-item-details-wrapper'>
                                <div className='cart-item-details'>
                                    <div className='cart-item-properties'>
                                        Delivering to: {getAddresses(item.properties)}
                                        <br />
                                        Postage: {item.properties?._shipping_name}
                                        <br />
                                        {item.properties?.['Send On Date'] && (
                                            <>
                                                Send On Date: {item.properties['Send On Date']}
                                                <br />
                                            </>
                                        )}
                                        {getExpectedDelivery(item.properties)}
                                    </div>
                                    <div className='cart-item-price-quantity-wrapper'>
                                        {item.price !== item.final_price ? (
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
                                    {item.properties?._printessSaveToken && (
                                        <button
                                            className='cart-item-preview-button'
                                            onClick={() => {
                                                if (typeof window.printessShowEditorForItem === 'function') {
                                                    window.printessShowEditorForItem(item)
                                                }
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
 
                                    {!item.properties?._printessSaveToken && item.product_type === 'Cards' && (
                                        <button
                                            className='cart-item-preview-button'
                                            onClick={() =>
                                                previewCard(item, item.key, item.url, item.properties?._json_editor_state)
                                            }
                                        >
                                            {getMessage(item.properties)}
                                        </button>
                                    )}
 
                                    <button className='cart-item-add-address-button' onClick={() => showModal(setIsModalOpen, item)}>
                                        {item.properties?._shipping_address ? 'Change Address' : 'Add Address'}
                                    </button>
 
                                    {item.properties?._shipping_address && (
                                        <button className='cart-item-add-address-button' onClick={() => showModal(setIsPostageModalOpen, item)}>
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
                                    {item.gift.properties?._shipping_name && (
                                        <>
                                            Postage: {item.gift.properties._shipping_name}
                                            <br />
                                        </>
                                    )}
                                    {item.gift.properties?.['Send On Date'] && (
                                        <>
                                            Send On Date: {item.gift.properties['Send On Date']}
                                            <br />
                                        </>
                                    )}
                                    {getExpectedDelivery(item.gift.properties)}
                                </div>
                                <div className='cart-gift-item-price-remove'>
                                    {item.gift.price !== item.gift.final_price ? (
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
 
CartItems.propTypes = {
    groups: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    customerName: PropTypes.string,
    cartContent: PropTypes.object.isRequired,
}
 
export default CartItems