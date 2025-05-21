import React from 'react'
import PropTypes from 'prop-types'

const TextSizeIcon = ({ width, height, color }) => {
    return (
        <svg className='icon text-size-icon' version='1.1' id='Layer_1' width={width} height={height} viewBox='0 0 31.5 31.5' xmlns='http://www.w3.org/2000/svg'>
            <g id='g832' transform='matrix(0.75872523,0,0,0.75872523,-2.8445426,3.6299494)'>
                <path
                    d='M 7.5,29.4 C 9.9,20.5 13,11.8 16.9,3.5 c -1,0 -2.1,0 -3.1,0 4,8.1 7,16.7 9.2,25.4 0.6,2.2 4,1.3 3.5,-1 C 24.2,18.8 21,10 16.9,1.6 c -0.6,-1.2 -2.6,-1.2 -3.1,0 -4,8.6 -7.3,17.6 -9.7,26.8 -0.7,2.3 2.8,3.2 3.4,1 z'
                    id='path824'
                    fill={color}
                />
                <path d='m 9.4,21.6 c 3.7,-0.3 7.4,-0.6 11,-0.8 0.9,-0.1 1.8,-0.8 1.8,-1.8 0,-0.9 -0.8,-1.9 -1.8,-1.8 -3.7,0.3 -7.4,0.6 -11,0.8 -0.9,0.1 -1.8,0.8 -1.8,1.8 0.1,0.9 0.8,1.9 1.8,1.8 z' id='path828' fill={color} />
            </g>
            <g id='g842' transform='matrix(0.74570038,0,0,0.74570038,13.181709,5.7352914)'>
                <path
                    d='m 10.1,26.8 c 2.1,-6 4.6,-11.9 7.4,-17.6 -1.1,-0.1 -2.2,-0.3 -3.3,-0.4 2.2,6 4.3,12 6.5,18.1 0.3,0.9 1.2,1.5 2.2,1.3 C 23.8,28 24.5,26.9 24.2,26 22,20 19.9,14 17.7,7.9 17.2,6.6 15.2,6 14.4,7.5 c -3,6 -5.6,12.1 -7.8,18.4 -0.3,0.9 0.4,2 1.3,2.2 1,0.2 1.9,-0.4 2.2,-1.3 z'
                    id='path834'
                    fill={color}
                />
                <path d='m 11.3,22.1 c 2.4,-0.1 4.9,-0.2 7.3,-0.3 0.9,0 1.8,-0.8 1.8,-1.8 0,-0.9 -0.8,-1.8 -1.8,-1.8 -2.4,0.1 -4.9,0.2 -7.3,0.3 -0.9,0 -1.8,0.8 -1.8,1.8 0.1,1 0.8,1.9 1.8,1.8 z' id='path838' fill={color} />
            </g>
        </svg>
    )
}

export default TextSizeIcon

TextSizeIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
