import React from 'react'
import PropTypes from 'prop-types'

const ArrowRightIcon = ({ width, height, color }) => {
    return (
        <svg width={width} height={height} viewBox='0 0 34.875999 34.875999' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <g>
                <path
                    d='M9.6,28.5c4.5-3.3,9.1-6.5,13.6-9.8c0.6-0.5,1.3-0.9,1.9-1.4c1.2-0.8,1.2-2.3,0-3.1c-4.5-3.3-9.1-6.5-13.6-9.8
			        C10.9,3.9,10.2,3.5,9.6,3c-0.8-0.6-2-0.1-2.5,0.6C6.6,4.6,7,5.5,7.8,6.1c4.5,3.3,9.1,6.5,13.6,9.8c0.6,0.5,1.3,0.9,1.9,1.4
			        c0-1,0-2.1,0-3.1c-4.5,3.3-9.1,6.5-13.6,9.8c-0.6,0.5-1.3,0.9-1.9,1.4C7,26,6.6,27,7.1,27.9C7.6,28.6,8.8,29.1,9.6,28.5L9.6,28.5z'
                    fill={color}
                />
            </g>
        </svg>
    )
}

export default ArrowRightIcon

ArrowRightIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
