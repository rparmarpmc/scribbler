import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './Cart.css'
import MultiBuy from './MultiBuy/MultiBuy'
import CartItems from './CartItems/CartItems'
import MobileCartTotals from './MobileCartTotals'
import DesktopCartTotals from './DesktopCartTotals'
import { countryToCode } from '../../helpers/countryToCode'
import { calculateShippingTotal } from '../../middlewares/api'
import { formatCurrency, convertCurrency, convertFormatCurrency } from '../../helpers/formatCurrency'
import { apiUpdateCartKey } from '../../store/actions'

const Cart = ({ isLoggedIn, customerName, cartContent, groups }) => {
    const dispatch = useDispatch()
    const [isMobile, setIsMobile] = useState(false)
    const mediaQuery = window.matchMedia('(max-width: 989px)')

    mediaQuery.addEventListener('change', (e) => handleWidthChange(e))

    const handleWidthChange = (e) => (e.matches ? setIsMobile(true) : setIsMobile(false))

    useEffect(() => {
        handleWidthChange(mediaQuery)
    }, [])

    useEffect(() => {
        if (cartContent?.token) dispatch(apiUpdateCartKey())
    }, [cartContent])

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

    const calculateTotal = (productCost, shippingCost, prepayCreditBalance, discount) => {
        let total = 0
        if (!productCost) return formatCurrency(0)

        const productTotal = productCost // productCost in local currency ex. 1808
        const shippingTotal = convertCurrency(shippingCost.total_delivery_price * 100) //shippingTotal in pounds ex. 1.25

        let prepayTotal = convertCurrency(shippingTotal + shippingCost?.cart?.data?.cart?.appliedGiftCards[0]?.presentmentAmountUsed?.amount * 100) // prepay_credit_balance in pounds ex. 1998

        if (prepayTotal > convertCurrency(prepayCreditBalance)) {
            prepayTotal = convertCurrency(prepayCreditBalance)
        }

        total = productTotal
        if (shippingTotal) total = total + shippingTotal
        if (prepayTotal && isLoggedIn) total = total - prepayTotal
        if (discount) total = total - discount

        if (total) {
            return formatCurrency(total)
        } else {
            return formatCurrency(0)
        }
    }

    const getTotalShipping = async () => {
        const shippingRequest = []

        cartContent?.items?.map((item) => {
            if (!item.properties._shipping_address) return

            const addressDetails = JSON.parse(item.properties._shipping_address)
            shippingRequest.push({
                basket_id: cartContent.token,
                product_type: product_type(item.product_type),
                product_size: item.variant_title && item.variant_title.includes('Large') ? 2 : 1, // 2 for large cards and 1 small cards
                product_quantity: item.quantity,
                address: {
                    line: addressDetails.address1 + ' ' + addressDetails.address2 + ' ' + addressDetails.city + ' ' + addressDetails.province,
                    postcode: addressDetails.zip,
                    country: countryToCode(addressDetails.country)
                },
                attached_products: [],
                delivery_id: item.properties._shipping_id
            })
        })

        if (shippingRequest.length > 0) {
            const shippingTotal = await calculateShippingTotal(shippingRequest)
            return shippingTotal
        } else {
            return 0
        }
    }

    const calculatePrePayUsed = (shippingTotal, prepayCreditBalance) => {
        if (!isLoggedIn) return convertFormatCurrency(0)
        if (!shippingTotal && !shippingTotal?.cart?.data?.cart?.appliedGiftCards[0]?.presentmentAmountUsed?.amount) return convertFormatCurrency(0)
        const shippingCost = convertCurrency(shippingTotal.total_delivery_price * 100)
        const prePayAmount = convertCurrency(shippingTotal?.cart?.data?.cart?.appliedGiftCards[0]?.presentmentAmountUsed?.amount * 100)

        if (!shippingCost || !prePayAmount) return convertFormatCurrency(0)

        let prePay = shippingCost + prePayAmount

        if (prePay > convertCurrency(prepayCreditBalance)) {
            prePay = convertCurrency(prepayCreditBalance)
        }

        return <span> -{convertFormatCurrency(prePay)}</span>
    }

    return (
        <div className='cart-wrapper'>
            <div className='cart-title'>
                <div className='cart-desktop-title'>Your Basket</div>
                <div className='cart-mobile-title'>Basket</div>
            </div>
            <div className='cart-content-wrapper'>
                <div className='cart-page-content'>
                    <MultiBuy cartContent={cartContent} />
                    {groups.length > 0 && <CartItems groups={groups} customerName={customerName} isLoggedIn={isLoggedIn} cartContent={cartContent} />}
                </div>
                {isMobile ? (
                    <MobileCartTotals isLoggedIn={isLoggedIn} cartContent={cartContent} calculateTotal={calculateTotal} getTotalShipping={getTotalShipping} calculatePrePayUsed={calculatePrePayUsed} />
                ) : (
                    <DesktopCartTotals isLoggedIn={isLoggedIn} cartContent={cartContent} calculateTotal={calculateTotal} getTotalShipping={getTotalShipping} calculatePrePayUsed={calculatePrePayUsed} />
                )}
            </div>
        </div>
    )
}

export default Cart

Cart.propTypes = {
    isLoggedIn: PropTypes.bool,
    customerName: PropTypes.string,
    cartContent: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired
}
