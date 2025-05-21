import React from 'react'
import PropTypes from 'prop-types'

const GiftIcon = ({ width, height, color }) => {
    return (
        <svg className='icon icon-gift' width={width} height={height} viewBox='0 0 76.8 85'>
            <g id='Icon_feather-shopping-bag' data-name='Icon feather-shopping-bag' transform='translate(-3 -1.5)'>
                <path id='Path_19' data-name='Path 19' d='M16.8,3,4.5,19.4V76.8A8.2,8.2,0,0,0,12.7,85H70.1a8.2,8.2,0,0,0,8.2-8.2V19.4L66,3Z' fill='none' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' />
                <path id='Path_20' data-name='Path 20' d='M4.5,9H78.3' transform='translate(0 10.4)' fill='none' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' />
                <path id='Path_21' data-name='Path 21' d='M44.8,15A16.4,16.4,0,0,1,12,15' transform='translate(13 20.8)' fill='none' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' />
            </g>
        </svg>
    )
}

export default GiftIcon

GiftIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
