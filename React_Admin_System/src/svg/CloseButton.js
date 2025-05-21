import React from 'react'
import PropTypes from 'prop-types'

const CloseButton = ({ width, height, color }) => {
    return (
        <svg className='icon icon-close' width={width} height={height} version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 31.5 31.5'>
            <path className='st0' d='M3.4,5.7c7.6,7.3,14.9,14.8,22,22.6c1.6,1.7,4.1-0.8,2.5-2.5C20.9,18,13.5,10.4,6,3.2C4.3,1.5,1.7,4.1,3.4,5.7L3.4,5.7z' fill={color} />

            <path className='st0' d='M5.5,27.8c7.4-7.5,15-14.7,22.9-21.7c1.7-1.5-0.8-4.1-2.5-2.5C18,10.6,10.4,17.8,3,25.3C1.3,26.9,3.9,29.5,5.5,27.8L5.5,27.8z' fill={color} />
        </svg>
    )
}

export default CloseButton

CloseButton.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}

//  <svg className='icon icon-close' width={width} height={height} viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
//         <path
//             d='M 319.61429,256.70939 493.68033,82.643357 A 44.012005,44.012005 0 0 0 431.49295,20.346038 L 257.42691,194.41207 83.360869,20.346038 A 44.050857,44.050857 0 0 0 21.063551,82.643357 L 195.12959,256.70939 21.063551,430.77543 a 44.050857,44.050857 0 1 0 62.297318,62.29732 L 257.42691,319.00671 431.49295,493.07275 a 44.050857,44.050857 0 0 0 62.29731,-62.29732 z'
//             fill={color}
//         ></path>
//     </svg>
