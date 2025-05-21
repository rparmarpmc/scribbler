import React from 'react'
import PropTypes from 'prop-types'

import './DesktopCartTotals.css'
// import LoyaltyScheme from './LoyaltyScheme/LoyaltyScheme'
import OrderSummary from './OrderSummary/OrderSummary'
import DiscountBox from './DiscountBox/DiscountBox'
import PrePayBalance from './PrePayBalance/PrePayBalance'

const DesktopCartTotals = ({ isLoggedIn, cartContent, calculateTotal, getTotalShipping, calculatePrePayUsed }) => {
    return (
        <div className='desktop-cart-page-totals'>
            {/* <LoyaltyScheme /> */}
            <OrderSummary cartContent={cartContent} calculateTotal={calculateTotal} getTotalShipping={getTotalShipping} calculatePrePayUsed={calculatePrePayUsed} />
            <DiscountBox />
            {isLoggedIn && <PrePayBalance />}
        </div>
    )
}

export default DesktopCartTotals

DesktopCartTotals.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    cartContent: PropTypes.object.isRequired,
    calculateTotal: PropTypes.func.isRequired,
    getTotalShipping: PropTypes.func.isRequired,
    calculatePrePayUsed: PropTypes.func.isRequired
}
