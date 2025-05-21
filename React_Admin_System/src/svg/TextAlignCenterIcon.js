import React from 'react'
import PropTypes from 'prop-types'

const TextAlignCenterIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-align-center-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31.5 31.5'>
            <path d='M8.9,4.8c4.6-0.1,9.2-0.1,13.8-0.2C25,4.6,25,1,22.7,1c-4.6,0.1-9.2,0.1-13.8,0.2C6.6,1.2,6.6,4.8,8.9,4.8L8.9,4.8z' fill={color} />
            <path d='M2.2,12.8c9-0.3,18-0.4,26.9-0.3c2.3,0,2.3-3.6,0-3.6c-9-0.1-18,0-26.9,0.3C-0.1,9.3-0.1,12.9,2.2,12.8L2.2,12.8z' fill={color} />
            <path
                d='M8,21.4c4.9-0.3,9.7-0.3,14.6-0.1c1,0.1,1.8-0.9,1.8-1.8c0-1-0.8-1.7-1.8-1.8c-4.9-0.3-9.7-0.2-14.6,0.1
			    c-1,0.1-1.8,0.8-1.8,1.8C6.2,20.6,7.1,21.5,8,21.4L8,21.4z'
                fill={color}
            />
            <path d='M28.3,26c-8.5,0.7-17,0.9-25.5,0.8c-2.3,0-2.3,3.6,0,3.6c8.5,0.1,17-0.2,25.5-0.8C30.6,29.4,30.6,25.8,28.3,26L28.3,26z' fill={color} />
        </svg>
    )
}

export default TextAlignCenterIcon

TextAlignCenterIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
