import React from 'react'
import PropTypes from 'prop-types'

const TextFontIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-font-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31.5 31.5'>
            <g>
                <g>
                    <path
                        d='M7.5,29.4c2.4-8.9,5.5-17.6,9.4-25.9c-1,0-2.1,0-3.1,0c4,8.1,7,16.7,9.2,25.4c0.6,2.2,4,1.3,3.5-1
			            c-2.3-9.1-5.5-17.9-9.6-26.3c-0.6-1.2-2.6-1.2-3.1,0c-4,8.6-7.3,17.6-9.7,26.8C3.4,30.7,6.9,31.6,7.5,29.4L7.5,29.4z'
                        fill={color}
                    />
                </g>
            </g>
            <g>
                <g>
                    <path
                        d='M9.4,21.6c3.7-0.3,7.4-0.6,11-0.8c0.9-0.1,1.8-0.8,1.8-1.8c0-0.9-0.8-1.9-1.8-1.8c-3.7,0.3-7.4,0.6-11,0.8
			            c-0.9,0.1-1.8,0.8-1.8,1.8C7.7,20.7,8.4,21.7,9.4,21.6L9.4,21.6z'
                        fill={color}
                    />
                </g>
            </g>
        </svg>
    )
}

export default TextFontIcon

TextFontIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
