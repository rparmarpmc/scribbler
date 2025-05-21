import React from 'react'
import PropTypes from 'prop-types'

import './Spinner.css'

const Spinner = ({ size, color }) => {
    return (
        <div className='api-loading-spinner' style={{ width: size + 'px', height: size + 'px' }}>
            <svg className='api-spinner' viewBox='0 0 50 50'>
                <circle className='api-spinner-path' cx='25' cy='25' r='20' fill='none' stroke={color} strokeWidth='4'></circle>
            </svg>
        </div>
    )
}

export default Spinner

Spinner.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
