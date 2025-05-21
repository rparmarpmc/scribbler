import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './DiscountBox.css'
import Spinner from '../../Spinner/Spinner'
import CloseButton from '../../../svg/CloseButton'
import { apiAddDiscount } from '../../../store/actions'

const DiscountBox = () => {
    const dispatch = useDispatch()
    const cartContent = useSelector((state) => state.cartContent)
    const discounts = useSelector((state) => state.discounts)
    const [discountCode, setDiscountCode] = useState()
    const [appliedDiscountCodes, setAppliedDiscountCodes] = useState([])
    const discountInputRef = createRef()
    const discountButtonRef = createRef()
    const [loading, setLloading] = useState(false)
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        setErrorMessage(discounts)
    }, [discounts])

    const applyNewDiscount = () => {
        setSuccessMessage()
        setErrorMessage()
        discountButtonRef.current.classList.remove('active-discount-box')
        if (discountInputRef?.current?.value?.length > 0) {
            let codes = discountCode

            if (appliedDiscountCodes.length > 0) {
                codes += ',' + appliedDiscountCodes.toString()
            }

            setLloading(true)
            dispatch(apiAddDiscount({ discount_code: codes }))
            discountInputRef.current.value = null
            discountInputRef.current.placeholder = 'Add discount code'
        } else {
            setErrorMessage('Discount code is empty')
        }
    }

    const setCode = () => {
        if (discountInputRef.current.value.length > 0) {
            discountButtonRef.current.classList.add('active-discount-box')
        } else {
            discountButtonRef.current.classList.remove('active-discount-box')
        }
        setErrorMessage()
        setDiscountCode(discountInputRef.current.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            discountButtonRef.current.classList.remove('active-discount-box')
            applyNewDiscount()
        }
    }

    useEffect(() => {
        let unique = []
        cartContent?.items?.map((item) => {
            item?.discounts.map((discount) => {
                unique.push(discount.title)
            })
        })

        discountButtonRef.current.classList.remove('active-discount')
        setAppliedDiscountCodes(unique.filter((value, index, array) => array.indexOf(value) === index))
        setLloading(false)
    }, [cartContent])

    const removeDiscount = (discount) => {
        setSuccessMessage()
        setErrorMessage()
        const removedArray = appliedDiscountCodes.filter(function (e) {
            return e !== discount
        })
        dispatch(apiAddDiscount({ discount_code: removedArray.length > 0 ? removedArray : '-' }))
    }

    return (
        <div className='cart-discount-box-wrapper'>
            <div className='cart-discount-box-title'>Add Discount Code</div>
            <div className='cart-discount-box-input-wrapper'>
                <input type='text' ref={discountInputRef} onChange={setCode} onKeyDown={handleKeyDown} className='discount-input' autoCorrect='off' placeholder='Add discount code' />
                <button
                    ref={discountButtonRef}
                    onClick={() => {
                        applyNewDiscount()
                    }}
                    className='discount-box-apply-button'
                >
                    {loading && (
                        <div className='discount-apply-spinner'>
                            <Spinner size={25} color={'black'} />
                        </div>
                    )}
                    Apply
                </button>
            </div>
            {successMessage && <div className='cart-discount-status-success'>{successMessage}</div>}
            {errorMessage && <div className='cart-discount-status-error'>{errorMessage}</div>}
            {appliedDiscountCodes.length > 0 &&
                appliedDiscountCodes.map((discount, index) => {
                    return (
                        <div key={index} className='remove-discount-wrapper'>
                            {discount}
                            <button className='remove-discount-selector' type='button' onClick={() => removeDiscount(discount)}>
                                <CloseButton width={22} height={22} color='#ffffff' />
                            </button>
                        </div>
                    )
                })}
        </div>
    )
}

export default DiscountBox
