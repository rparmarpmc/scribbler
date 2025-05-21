import React from 'react'
import PropTypes from 'prop-types'

const TextColorIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-color-icon' width={width} height={height} viewBox='0 0 31.5 31.5' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <g id='g828' transform='matrix(0.7164459,0,0,0.7164459,4.3324074,1.0747048)'>
                <path
                    d='M 7.5,29.4 C 9.9,20.5 13,11.8 16.9,3.5 c -1,0 -2.1,0 -3.1,0 4,8.1 7,16.7 9.2,25.4 0.6,2.2 4,1.3 3.5,-1 C 24.2,18.8 21,10 16.9,1.6 c -0.6,-1.2 -2.6,-1.2 -3.1,0 -4,8.6 -7.3,17.6 -9.7,26.8 -0.7,2.3 2.8,3.2 3.4,1 z'
                    id='path824'
                    fill={color}
                />
                <path d='m 9.4,21.6 c 3.7,-0.3 7.4,-0.6 11,-0.8 0.9,-0.1 1.8,-0.8 1.8,-1.8 0,-0.9 -0.8,-1.9 -1.8,-1.8 -3.7,0.3 -7.4,0.6 -11,0.8 -0.9,0.1 -1.8,0.8 -1.8,1.8 0.1,0.9 0.8,1.9 1.8,1.8 z' id='path826' fill={color} />
            </g>
            <g id='g832' transform='matrix(0.87638097,0,0,0.87638097,1.4766831,13.479982)'>
                <path d='m 8,16.9 c 5.1,0 10.3,-0.1 15.4,-0.4 1,-0.1 1.8,-0.8 1.8,-1.8 0,-0.9 -0.8,-1.9 -1.8,-1.8 -5.1,0.3 -10.3,0.4 -15.4,0.4 -2.3,0 -2.3,3.6 0,3.6 z' id='path830' fill='red' />
            </g>
        </svg>
    )
}

export default TextColorIcon

TextColorIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
