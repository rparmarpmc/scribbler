import React from 'react'
import PropTypes from 'prop-types'

const RemoveIcon = ({ width, height, color }) => {
    return (
        <svg className='icon icon-remove-section' width={width} height={height} viewBox='0 0 34.875 34.875' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <path
                className='icon-remove-section-hover'
                fill={color}
                d='M 17.466455,0.12645619 C 32.873963,0.12557318 40.587891,18.752521 29.694458,29.645953 18.801025,40.539386 0.17407795,32.825458 0.17496107,17.41795 0.17331759,7.867441 7.915946,0.12481264 17.466455,0.12645619 Z M 21.356803,17.552511 v 0 0 0 c -0.65544,0.651746 -0.65544,-0.651747 0,0 v 0 0 c -0.65544,0.651746 -0.65544,-0.651747 0,0 v 0 c 0.651747,0.655439 0,0 0,0 z'
                id='path824'
            />
            <path
                d='M 20.177302,17.212709 27.481801,9.9082102 A 1.8469187,1.8469187 0 0 0 24.872171,7.2939691 L 17.567672,14.598469 10.263173,7.2939691 A 1.8485487,1.8485487 0 0 0 7.6489299,9.9082102 L 14.95343,17.212709 7.6489299,24.51721 a 1.8485481,1.8485481 0 1 0 2.6142431,2.61424 l 7.304499,-7.304498 7.304499,7.304498 a 1.848548,1.848548 0 0 0 2.614242,-2.61424 z'
                fill='#ffffff'
                strokeWidth='0'
                stroke={color}
            />
        </svg>
    )
}

export default RemoveIcon

RemoveIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
