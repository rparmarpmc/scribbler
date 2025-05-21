import React from 'react'
import PropTypes from 'prop-types'

const CalendarIcon = ({ width, height, color }) => {
    return (
        <svg width={width} height={height} viewBox='0 0 16 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0.492451 0.929688V5.43388H15.7157V0.929688H0.492451ZM0.492451 7.68598V18.7438C0.492451 18.8564 0.57944 18.9465 0.688178 18.9465H15.4982C15.6069 18.9465 15.6939 18.8564 15.6939 18.7438V7.68598H0.470703H0.492451ZM2.6672 9.93808H4.84194V12.1902H2.6672V9.93808ZM7.01669 9.93808H9.19143V12.1902H7.01669V9.93808ZM11.3662 9.93808H13.5409V12.1902H11.3662V9.93808ZM2.6672 14.4423H4.84194V16.6944H2.6672V14.4423ZM7.01669 14.4423H9.19143V16.6944H7.01669V14.4423Z'
                fill={color}
            />
        </svg>
    )
}

export default CalendarIcon

CalendarIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
