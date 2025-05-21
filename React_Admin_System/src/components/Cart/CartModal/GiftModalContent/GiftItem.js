import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './GiftItem.css'
import { apiAttachGiftToCard } from '../../../../store/actions'
import { convertFormatCurrency } from '../../../../helpers/formatCurrency'

const GiftItem = ({ item, gift, setIsGiftModalOpen }) => {
    const dispatch = useDispatch()
    const selectRef = useRef()
    const [price, setPrice] = useState()
    const [oldPrice, setOldPrice] = useState()

    useEffect(() => {
        const variantPrice = convertFormatCurrency(gift?.variants[0]?.price * 100)

        if (variantPrice.includes('.00')) {
            setPrice(variantPrice.replace('.00', ''))
        } else {
            setPrice(variantPrice)
        }

        if (gift?.variants[0]?.compare_at_price) {
            const promoVariantPrice = convertFormatCurrency(gift?.variants[0]?.compare_at_price * 100)
            if (promoVariantPrice.includes('.00')) {
                setOldPrice(promoVariantPrice.replace('.00', ''))
            } else {
                setOldPrice(promoVariantPrice)
            }
        }
    }, [])

    const updatePrice = (event) => {
        const optionPrice = convertFormatCurrency(event.target[event.target.selectedIndex].getAttribute('data-amount') * 100)
        if (optionPrice.includes('.00')) {
            setPrice(optionPrice.replace('.00', ''))
        } else {
            setPrice(optionPrice)
        }

        if (event.target[event.target.selectedIndex].getAttribute('data-compare-at')) {
            const optionComparePrice = convertFormatCurrency(event.target[event.target.selectedIndex].getAttribute('data-compare-at') * 100)
            if (optionComparePrice.includes('.00')) {
                setOldPrice(optionComparePrice.replace('.00', ''))
            } else {
                setOldPrice(optionComparePrice)
            }
        } else {
            setOldPrice()
        }
    }

    const addGift = () => {
        let variantId = null
        if (selectRef?.current?.value) {
            variantId = selectRef.current.value
        } else {
            variantId = gift?.variants[0]?.id
        }

        dispatch(apiAttachGiftToCard({ item, variantId }))
        document.body.classList.remove('no-scroll')
        setIsGiftModalOpen(false)
    }

    return (
        <div className='cart-gift-modal-item'>
            <div className='cart-gift-modal-item-image-wrapper'>
                <div className='cart-gift-modal-item-price'>
                    {oldPrice ? <div className='cart-gift-modal-item-old'>{oldPrice}</div> : null}
                    <div className={`cart-gift-modal-item-actual ${oldPrice ? 'promo' : ''}`}>{price}</div>
                </div>
                <img className='cart-gift-modal-item-image' src={gift?.image?.src} alt={gift.title} />
            </div>
            <div className='cart-gift-modal-item-title'>
                <a href={'/products/' + gift.handle}>{gift.title}</a>
            </div>
            <div className='cart-gift-modal-item-vendor'>
                <a href={'/products/' + gift.handle}>{gift.vendor}</a>
            </div>

            {gift?.variants?.length > 1 && (
                <select ref={selectRef} className={`gift-product-variants-selector ${gift?.variants?.length === 1 ? 'hidden' : 'active'}`} onChange={updatePrice}>
                    {gift?.variants.map((variant, index) => {
                        return (
                            <option key={index} data-amount={variant?.price} data-compare-at={variant?.compare_at_price} value={variant?.id}>
                                {variant?.title}
                            </option>
                        )
                    })}
                </select>
            )}
            {gift?.variants?.length <= 1 && <div className='cart-gift-modal-item-option'>Standard Size</div>}

            <button className='cart-gift-modal-item-add-button' onClick={() => addGift()}>
                Add Gift
            </button>
        </div>
    )
}

export default GiftItem

GiftItem.propTypes = {
    item: PropTypes.object.isRequired,
    gift: PropTypes.object.isRequired,
    setIsGiftModalOpen: PropTypes.func.isRequired
}
