import React from 'react'
import PropTypes from 'prop-types'

const TextAlignRightIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-align-right-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31.5 31.5'>
            <path
                d='M12.5,4.9c5.4-0.3,10.7-0.3,16.1-0.2c2.3,0.1,2.3-3.5,0-3.6C23.2,1,17.8,1,12.5,1.3c-1,0-1.8,0.8-1.8,1.8
			    C10.7,4,11.5,4.9,12.5,4.9L12.5,4.9z'
                fill={color}
            />
            <path d='M2.5,12.9c8.6,0,17.2,0.1,25.9,0.2c2.3,0,2.3-3.6,0-3.6C19.7,9.4,11.1,9.3,2.5,9.3C0.1,9.3,0.1,12.9,2.5,12.9L2.5,12.9z' fill={color} />
            <path d='M3.1,29.7c8.2,0.1,16.4-0.2,24.6-0.3c2.3,0,2.3-3.6,0-3.6c-8.2,0.1-16.4,0.4-24.6,0.3C0.8,26.1,0.8,29.7,3.1,29.7L3.1,29.7z' fill={color} />
            <path
                d='M12,21.5c5.1-0.3,10.3-0.3,15.5,0c1,0.1,1.8-0.9,1.8-1.8c0-1-0.8-1.7-1.8-1.8c-5.1-0.3-10.3-0.3-15.5,0
			    c-1,0.1-1.8,0.8-1.8,1.8C10.2,20.6,11.1,21.5,12,21.5L12,21.5z'
                fill={color}
            />
        </svg>
    )
}

export default TextAlignRightIcon

TextAlignRightIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
