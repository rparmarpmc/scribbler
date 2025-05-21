import React from 'react'
import PropTypes from 'prop-types'

const SmallEnvelope = ({ width, height, color }) => {
    return (
        <svg version='1.0' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 42.000000 30.000000' preserveAspectRatio='xMidYMid meet'>
            <g transform='translate(0.000000,30.000000) scale(0.100000,-0.100000)' fill={color} stroke='none'>
                <path
                    d='M231 274 c-163 -20 -206 -28 -206 -39 0 -6 4 -58 9 -117 l8 -108 26
                        0 c57 1 314 38 321 46 8 9 -4 196 -14 222 -2 6 -10 11 -17 11 -7 -1 -64 -8
                        -127 -15z m79 -63 c-22 -32 -53 -70 -69 -85 l-28 -27 -59 45 c-32 24 -70 56
                        -83 70 -23 24 -23 26 -5 27 10 0 59 7 109 14 50 7 109 13 133 14 l43 1 -41
                        -59z m69 -89 c1 -45 -2 -54 -21 -62 -21 -9 -280 -41 -285 -36 -1 1 17 24 40
                        50 l42 48 32 -18 c31 -18 32 -18 56 4 30 28 32 28 79 -9 21 -17 41 -29 44 -26
                        4 3 -48 49 -84 73 -2 1 16 28 40 60 l43 58 7 -45 c3 -24 7 -68 7 -97z m-239 8
                        c-1 -10 -79 -95 -83 -90 -3 3 -8 45 -12 94 l-8 89 52 -44 c28 -24 51 -46 51
                        -49z'
                />
                <path d='M210 184 c0 -16 -2 -17 -10 -4 -8 13 -10 12 -10 -2 0 -10 5 -18 10 -18 13 0 25 28 16 37 -3 4 -6 -2 -6 -13z' />
            </g>
        </svg>
    )
}

export default SmallEnvelope

SmallEnvelope.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
