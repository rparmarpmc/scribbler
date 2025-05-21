import React, { createRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './Quantity.css'
import PlusButton from '../../../svg/PlusButton'
import MinusButton from '../../../svg/MinusButton'
import { apiChangeCartItemQuantity } from '../../../store/actions'
import Spinner from '../../Spinner/Spinner'

const Quantity = ({ item }) => {
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const quantityInputRef = createRef()

    const increaseQuantity = () => {
        quantityInputRef.current.value++

        setloading(true)
        const quantity = parseInt(quantityInputRef.current.value)
        dispatch(apiChangeCartItemQuantity({ itemKey: item.key, itemQuantity: quantity, giftKey: null, giftQuantity: null }))
    }

    const decreaseQuantity = () => {
        if (quantityInputRef.current.value > 0) {
            quantityInputRef.current.value--
        }
        setloading(true)
        const quantity = parseInt(quantityInputRef.current.value)

        if (quantity === 0 && item.gift) {
            dispatch(apiChangeCartItemQuantity({ itemKey: item.key, itemQuantity: quantity, giftKey: item.gift.key, giftQuantity: quantity }))
        } else {
            dispatch(apiChangeCartItemQuantity({ itemKey: item.key, itemQuantity: quantity, giftKey: null, giftQuantity: null }))
        }
    }

    useEffect(() => {
        setloading(false)
    }, [item.quantity])

    return (
        <div className='cart-item-quantity-box'>
            {loading && <Spinner size={35} color={'black'} />}
            <button className='cart-item-quantity-decrease' name='minus' type='button' onClick={() => decreaseQuantity()}>
                <MinusButton width={14} height={14} color='#ffffff' />
            </button>
            <input className='cart-item-quantity-input' ref={quantityInputRef} disabled type='number' min={1} max={999} value={item.quantity} />
            <button className='cart-item-quantity-increase' name='plus' type='button' onClick={() => increaseQuantity()}>
                <PlusButton width={14} height={14} color='#ffffff' />
            </button>
        </div>
    )
}

export default Quantity

Quantity.propTypes = {
    item: PropTypes.object.isRequired
}
