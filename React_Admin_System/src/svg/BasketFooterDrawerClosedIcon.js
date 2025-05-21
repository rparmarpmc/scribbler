import React from 'react'
import PropTypes from 'prop-types'

const BasketFooterDrawerClosedIcon = ({ width, height, color }) => {
    return (
        <svg className='icon add-photos-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 50'>
            <path
                d='M13.544 32.52C12.776 32.52 12.392 31.8 12.776 31.176L22.76 17.208C22.904 16.968 23.192 16.728 23.576 16.728H23.816C24.2 16.728 24.488 16.968 24.632 17.208L34.376 31.176C34.76 31.8 34.376 32.52 33.608 32.52H30.296C29.96 32.52 29.672 32.28 29.528 32.088L23.624 23.976L17.624 32.088C17.48 32.28 17.192 32.52 16.856 32.52H13.544Z'
                fill={color}
            />
        </svg>
    )
}

export default BasketFooterDrawerClosedIcon

BasketFooterDrawerClosedIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
