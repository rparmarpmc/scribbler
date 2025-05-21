import React from 'react'
import PropTypes from 'prop-types'

const TextAlignLeftIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-align-left-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31.5 31.5'>
            <path d='M3.3,5.1c5.2-0.2,10.4-0.3,15.6-0.5c2.3-0.1,2.3-3.7,0-3.6C13.7,1.1,8.5,1.3,3.3,1.5C0.9,1.6,0.9,5.2,3.3,5.1L3.3,5.1z' fill={color} />
            <path d='M3,13.5c8.3-0.6,16.7-0.7,25-0.3c2.3,0.1,2.3-3.5,0-3.6C19.7,9.2,11.4,9.3,3,9.9C0.7,10,0.7,13.6,3,13.5L3,13.5z' fill={color} />
            <path
                d='M2.8,21.8c5.1-0.4,10.3-0.6,15.4-0.7c2.3,0,2.3-3.6,0-3.6c-5.2,0-10.3,0.3-15.4,0.7C1.9,18.3,1,19,1,20
			            C1,20.9,1.9,21.9,2.8,21.8L2.8,21.8z'
                fill={color}
            />
            <path d='M3.3,29.4c8.4-0.1,16.8,0,25.3,0.1c2.3,0,2.3-3.6,0-3.6c-8.4-0.2-16.8-0.2-25.3-0.1C0.9,25.8,0.9,29.4,3.3,29.4L3.3,29.4z' fill={color} />
        </svg>
    )
}

export default TextAlignLeftIcon

TextAlignLeftIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
