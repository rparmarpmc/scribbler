import React from 'react'
import PropTypes from 'prop-types'

const ImageRotateCCWIcon = ({ width, height, color }) => {
    return (
        <svg className='icon image-rotate-ccw-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 34.747 31.012'>
            <path
                d='M7.2,12.5c2.3-2.2,4.8-4.6,8.2-5.1c2.9-0.4,6.2,0.6,8,3c1.7,2.4,1.5,6,0.4,8.6c-1.1,2.6-3.5,4.6-6.4,4.9
			    c-3.4,0.4-6.9-2.1-8.2-5.1c-0.4-0.9-1.7-1.1-2.5-0.6c-0.9,0.5-1,1.6-0.6,2.5c1.7,3.8,6,6.7,10.1,6.9c4,0.2,7.9-2.1,10-5.4
			    c2.2-3.5,2.8-8.3,1.1-12.1c-1.7-3.8-5.7-6-9.7-6.3C12.2,3.4,8.2,6.5,4.6,10C2.9,11.6,5.5,14.1,7.2,12.5L7.2,12.5z'
                fill={color}
            />
            <path
                d='M4,5.5c-0.1,2-0.1,3.9-0.2,5.9c0,1,0.9,1.8,1.8,1.8c2.1,0.1,4.2,0.3,6.3,0.5c0.4,0,1-0.2,1.3-0.5c0.3-0.3,0.5-0.8,0.5-1.3
			    c0-1-0.8-1.7-1.8-1.8C9.8,9.8,7.7,9.7,5.6,9.6c0.6,0.6,1.2,1.2,1.8,1.8c0.1-2,0.1-3.9,0.2-5.9c0-0.9-0.9-1.8-1.8-1.8
			    C4.8,3.7,4,4.5,4,5.5L4,5.5z'
                fill={color}
            />
        </svg>
    )
}

export default ImageRotateCCWIcon

ImageRotateCCWIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
