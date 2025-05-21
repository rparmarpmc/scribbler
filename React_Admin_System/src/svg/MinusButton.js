import React from 'react'
import PropTypes from 'prop-types'

const MinusButton = ({ width, height, color }) => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-minus' width={width} height={height} fill='none' viewBox='0 0 10 2'>
            <path fillRule='evenodd' clipRule='evenodd' d='M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z' fill={color} stroke={color} strokeWidth='1.5'></path>
        </svg>
    )
}

export default MinusButton

MinusButton.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
