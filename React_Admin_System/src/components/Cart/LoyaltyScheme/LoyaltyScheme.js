import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'

import './LoyaltyScheme.css'

const LoyaltyScheme = () => {
    const [currentLoyalty, setCurrentLoyalty] = useState(0)
    const [afterLoyalty, setAfterLoyalty] = useState(0)

    useEffect(() => {
        window.loyalityError = setTimeout(() => {
            setCurrentLoyalty(40)
            setAfterLoyalty(80)
        }, 2000)
    }, [])

    return (
        <div className='loyalty-scheme-wrapper'>
            <div className='loyalty-scheme-wrapper-title'>Loyalty Scheme</div>
            <div className='loyalty-progress-wrapper'>
                <div className='loyalty-progress'>
                    <div className='loyalty-progress-current' style={{ width: currentLoyalty < 10 ? '35px' : currentLoyalty + '%' }}>
                        {currentLoyalty}
                    </div>
                    <div className='loyalty-progress-after' style={{ width: afterLoyalty < 10 ? '35px' : afterLoyalty + '%' }}>
                        {afterLoyalty}
                    </div>
                    <div className='loyalty-progress-current-label' style={{ left: currentLoyalty < 10 ? 'calc( 8% - 60px)' : 'calc(' + currentLoyalty + '% - 60px)' }}>
                        Current points
                    </div>
                    <div className='loyalty-progress-after-label' style={{ left: afterLoyalty < 10 ? 'calc( 8% - 60px)' : 'calc(' + afterLoyalty + '% - 60px)' }}>
                        Points after <br />
                        purchase
                    </div>
                </div>
                <div className='loyalty-progress-card'>
                    FREE
                    <br />
                    CARD
                </div>
            </div>
            <a href='#' className='loyalty-scheme-link'>
                Click to view Loyalty Scheme &gt;
            </a>
        </div>
    )
}

export default LoyaltyScheme

// LoyaltyScheme.propTypes = {
//     isLoggedIn: PropTypes.bool.isRequired,
//     customerName: PropTypes.string
// }
