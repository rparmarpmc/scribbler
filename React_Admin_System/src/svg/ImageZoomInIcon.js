import React from 'react'
import PropTypes from 'prop-types'

const ImageZoomInIcon = ({ width, height, color }) => {
    return (
        <svg className='icon image-zoom-in-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32'>
            <path
                d='M21.6,4.6C18,1.8,13.4,1.2,9.2,3c-4.3,1.9-7,6.6-6.5,11.3c0.5,4.7,3.9,8.7,8.4,10c4.6,1.3,9.5-0.7,12.3-4.5
				C26.9,15.1,26,8.3,21.6,4.6c-0.7-0.6-1.8-0.7-2.5,0c-0.6,0.6-0.8,1.9,0,2.5c2.8,2.3,3.9,6.4,2.1,9.7c-1.5,2.8-4.7,4.6-7.9,4.2
				c-3.1-0.4-5.9-2.7-6.7-5.7C5.6,12,7,8.4,9.9,6.7c2.8-1.7,6.5-1.5,9.1,0.5c0.8,0.6,1.8,0.7,2.5,0C22.2,6.5,22.4,5.2,21.6,4.6z'
                fill={color}
            />
            <path
                d='M19.3,22.1c1.8,2,3.6,4,5.5,6c0.7,0.7,1.9,0.7,2.5,0c0.7-0.7,0.7-1.8,0-2.5c-1.9-1.9-3.7-3.9-5.5-6
				c-0.6-0.7-1.9-0.7-2.5,0C18.6,20.3,18.7,21.3,19.3,22.1L19.3,22.1z'
                fill={color}
            />
            <path
                d='M12.6,9.3c0.1,2.6,0.2,5.3,0.2,7.9c0,0.9,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8c0-2.6-0.1-5.3-0.2-7.9
			    c0-0.9-0.8-1.8-1.8-1.8C13.5,7.6,12.5,8.3,12.6,9.3L12.6,9.3z'
                fill={color}
            />
            <path
                d='M10.5,15.2c2.6-0.1,5.3-0.2,7.9-0.2c0.9,0,1.8-0.8,1.8-1.8c0-1-0.8-1.8-1.8-1.8c-2.6,0-5.3,0.1-7.9,0.2
			    c-0.9,0-1.8,0.8-1.8,1.8C8.8,14.3,9.5,15.2,10.5,15.2L10.5,15.2z'
                fill={color}
            />
        </svg>
    )
}

export default ImageZoomInIcon

ImageZoomInIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
