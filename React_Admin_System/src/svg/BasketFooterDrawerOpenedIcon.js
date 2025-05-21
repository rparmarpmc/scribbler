import React from 'react'
import PropTypes from 'prop-types'

const BasketFooterDrawerOpenedIcon = ({ width, height, color }) => {
    return (
        <svg className='icon add-photos-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 50'>
            <path
                d='M33.456 17.48C34.224 17.48 34.608 18.2 34.224 18.824L24.24 32.792C24.096 33.032 23.808 33.272 23.424 33.272L23.184 33.272C22.8 33.272 22.512 33.032 22.368 32.792L12.624 18.824C12.24 18.2 12.624 17.48 13.392 17.48L16.704 17.48C17.04 17.48 17.328 17.72 17.472 17.912L23.376 26.024L29.376 17.912C29.52 17.72 29.808 17.48 30.144 17.48L33.456 17.48Z'
                fill={color}
            />
        </svg>
    )
}

export default BasketFooterDrawerOpenedIcon

BasketFooterDrawerOpenedIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
