import React from 'react'
import PropTypes from 'prop-types'

const Preview = ({ width, height, color }) => {
    return (
        <svg className='icon icon-gift' width={width} height={height} viewBox='0 0 100 100'>
            <circle fill='#cad71d' strokeWidth='0' cx='50' cy='50' r='49' />
            <g>
                <path
                    fill={color}
                    strokeWidth='0'
                    d='M51.6,25.7c-7.2-7.2-18.9-7.4-26.3-.4-.2.1-.3.3-.4.4-.1.1-.3.3-.4.4-7,7.4-6.8,19.1.4,26.3,6.7,6.7,17.3,7.3,24.7,1.8l2.2,2.5,4.1-4.1-2.5-2.2c5.5-7.4,4.9-18-1.8-24.7ZM50.6,47.9c-.5.7-1,1.3-1.6,1.9s-1.3,1.2-1.9,1.6c-5.9,4.2-14.2,3.7-19.5-1.6-5.7-5.7-5.9-14.9-.6-20.8.2-.2.4-.4.6-.6.2-.2.4-.4.6-.6,6-5.3,15.1-5.1,20.8.6,5.3,5.3,5.9,13.6,1.6,19.5ZM57.1,53.7l-4.3,4.3.7.8,4.4-4.4-.8-.7ZM59.1,55.5l-4.5,4.5,17,19.1c1.8,1.8,4.7,1.8,6.5,0,1.8-1.8,1.8-4.7,0-6.5l-19.1-17ZM76.1,77c-.7.7-1.8.7-2.5,0s-.7-1.8,0-2.5c.7-.7,1.8-.7,2.5,0,.7.7.7,1.8,0,2.5Z'
                />
                <g>
                    <path fill={color} strokeWidth='0' d='M38.3,51.6h0c0,.5-.6.9-1.3.9-6.6-1.2-10.8-5.3-11.9-11.9,0-.7.4-1.3.9-1.3h0c.5,0,.9.5,1,1.1,1.1,5.7,4.5,9.2,10.2,10.2.6,0,1.1.5,1.1,1Z' />
                    <path fill={color} strokeWidth='0' d='M50.7,39.1h0c.5,0,.9-.6.9-1.3-1.2-6.6-5.3-10.8-11.9-11.9-.7,0-1.3.4-1.3.9h0c0,.5.5.9,1.1,1,5.7,1.1,9.2,4.5,10.2,10.2,0,.6.5,1.1,1,1.1Z' />
                </g>
            </g>
        </svg>
    )
}

export default Preview

Preview.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
