import React from 'react'
import PropTypes from 'prop-types'

const PlusButton = ({ width, height, color }) => {
    return (
        <svg className='icon icon-plus' width={width} height={height} viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z' fill={color} stroke={color} strokeWidth='1.5'></path>
        </svg>
    )
}

export default PlusButton

PlusButton.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
