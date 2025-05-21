import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import './PrePayBalance.css'
import { convertFormatCurrency } from '../../../helpers/formatCurrency'

const PrePayBalance = () => {
    const userDetails = useSelector((state) => state.userDetails)
    return (
        <div className='prepay-balance-wrapper'>
            <div className='prepay-balance-title'>PrePay Balance</div>
            <div className='prepay-balance-amount'>{convertFormatCurrency(userDetails?.prepay_credit_balance)}</div>
        </div>
    )
}

export default PrePayBalance

PrePayBalance.propTypes = {
    isLoggedIn: PropTypes.bool
}
