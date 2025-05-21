import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import './MobileCartTotals.css'
// import LoyaltyScheme from './LoyaltyScheme/LoyaltyScheme'
import MobileOrderSummary from './OrderSummary/MobileOrderSummary'
import DiscountBox from './DiscountBox/DiscountBox'
import PrePayBalance from './PrePayBalance/PrePayBalance'
import BasketFooterDrawerClosedIcon from '../../svg/BasketFooterDrawerClosedIcon'
import BasketFooterDrawerOpenedIcon from '../../svg/BasketFooterDrawerOpenedIcon'

const MobileCartTotals = ({ isLoggedIn, cartContent, calculateTotal, getTotalShipping, calculatePrePayUsed }) => {
    const [drawerOpenned, setDrawerOpenned] = useState(false)
    const toggleDrawer = (state) => setDrawerOpenned(state)
    const [shippingCost, setShippingCost] = useState(0)
    const userDetails = useSelector((state) => state.userDetails)

    useEffect(() => {
        getShipping()
    }, [cartContent])

    const getShipping = async () => {
        const shippingTotal = await getTotalShipping()
        setShippingCost(shippingTotal)
    }

    return (
        <div className='mobile-cart-page-totals' style={{ height: drawerOpenned ? '510px' : '170px' }}>
            <div className='mobile-cart-page-totals-animation'>
                <button className='cart-page-toggle-button' onClick={() => toggleDrawer(!drawerOpenned)}>
                    {drawerOpenned ? <BasketFooterDrawerOpenedIcon width={50} height={50} color='#000000' /> : <BasketFooterDrawerClosedIcon width={50} height={50} color='#000000' />}
                </button>
                {drawerOpenned ? (
                    <div className='mobile-cart-tap-to-collapse'>Tap to collapse</div>
                ) : (
                    <div className='mobile-cart-tap-to-expand'>
                        Tap to expand <span className='mobile-cart-tap-to-expand-total'>Order total: {calculateTotal(cartContent.original_total_price, shippingCost, userDetails?.prepay_credit_balance, cartContent.total_discount)}</span>
                    </div>
                )}
                {/* {drawerOpenned && <LoyaltyScheme />} */}
                {drawerOpenned && <DiscountBox />}
                {drawerOpenned && isLoggedIn && <PrePayBalance />}
                <MobileOrderSummary drawerOpenned={drawerOpenned} cartContent={cartContent} calculateTotal={calculateTotal} getTotalShipping={getTotalShipping} calculatePrePayUsed={calculatePrePayUsed} />
            </div>
        </div>
    )
}

export default MobileCartTotals

MobileCartTotals.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    cartContent: PropTypes.object.isRequired,
    calculateTotal: PropTypes.func.isRequired,
    getTotalShipping: PropTypes.func.isRequired,
    calculatePrePayUsed: PropTypes.func.isRequired
}
