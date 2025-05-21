import React from 'react'
import PropTypes from 'prop-types'

const ArrowLeftIcon = ({ width, height, color }) => {
    return (
        <svg width={width} height={height} viewBox='0 0 34.876 34.876' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <g>
                <path
                    d='M20.6,3c-4.5,3.3-9.1,6.5-13.6,9.8c-0.6,0.5-1.3,0.9-1.9,1.4C4,15,4,16.5,5.1,17.3c4.5,3.3,9.1,6.5,13.6,9.8
			        c0.6,0.5,1.3,0.9,1.9,1.4c0.8,0.6,2,0.1,2.5-0.6c0.5-0.9,0.1-1.9-0.6-2.5c-4.5-3.3-9.1-6.5-13.6-9.8c-0.6-0.5-1.3-0.9-1.9-1.4
			        c0,1,0,2.1,0,3.1c4.5-3.3,9.1-6.5,13.6-9.8c0.6-0.5,1.3-0.9,1.9-1.4c0.8-0.6,1.2-1.6,0.6-2.5C22.7,2.9,21.4,2.4,20.6,3L20.6,3z'
                    fill={color}
                />
            </g>
        </svg>
    )
}

export default ArrowLeftIcon

ArrowLeftIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
