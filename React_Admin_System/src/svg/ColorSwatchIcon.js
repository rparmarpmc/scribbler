import React from 'react'
import PropTypes from 'prop-types'

const ColorSwatchIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-color-swatch-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 46 46'>
            <rect id='Rectangle_37' data-name='Rectangle 37' width='46' height='46' rx='15' strokeWidth='6' stroke='transparent' fill={color} />
        </svg>
    )
}

export default ColorSwatchIcon

ColorSwatchIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
