import React from 'react'
import PropTypes from 'prop-types'

const ImageRotateCWIcon = ({ width, height, color }) => {
    return (
        <svg className='icon image-rotate-cw-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 34.743 31.013'>
            <path
                d='M27.1,10c-3.2-3.1-6.7-5.9-11.3-6.2C11.7,3.5,7.4,5.4,5.2,8.9C2.9,12.4,3.3,17.3,5,21c1.7,3.7,5.2,6.2,9.3,6.6
			    c4.6,0.5,9.6-2.8,11.5-6.9c0.4-0.9,0.3-1.9-0.6-2.5c-0.8-0.5-2.1-0.2-2.5,0.6c-1.2,2.6-4.1,5-7,5.2c-2.9,0.1-5.6-1.4-7-3.9
			    c-1.4-2.4-2-6-0.8-8.6c1.2-2.8,4.4-4.2,7.3-4.1c3.9,0,6.8,2.6,9.4,5.2C26.3,14.1,28.8,11.6,27.1,10L27.1,10z'
                fill={color}
            />
            <path
                d='M24.2,5.5c0.1,2,0.1,3.9,0.2,5.9c0.6-0.6,1.2-1.2,1.8-1.8c-2.1,0.1-4.2,0.3-6.3,0.5c-0.5,0-0.9,0.2-1.3,0.5
			    c-0.3,0.3-0.5,0.8-0.5,1.3c0,0.9,0.8,1.9,1.8,1.8c2.1-0.2,4.2-0.3,6.3-0.5c0.9-0.1,1.8-0.8,1.8-1.8c-0.1-2-0.1-3.9-0.2-5.9
			    c0-0.9-0.8-1.8-1.8-1.8C25,3.7,24.1,4.5,24.2,5.5L24.2,5.5z'
                fill={color}
            />
        </svg>
    )
}

export default ImageRotateCWIcon

ImageRotateCWIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
