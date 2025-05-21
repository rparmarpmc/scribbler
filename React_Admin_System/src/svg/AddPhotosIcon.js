import React from 'react'
import PropTypes from 'prop-types'

const AddPhotosIcon = ({ width, height, color }) => {
    return (
        <svg className='icon add-photos-icon' xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32'>
            <path
                id='Icon_material-add-to-photos'
                data-name='Icon material-add-to-photos'
                d='M6.2,9.4H3V31.8A3.209,3.209,0,0,0,6.2,35H28.6V31.8H6.2ZM31.8,3H12.6A3.209,3.209,0,0,0,9.4,6.2V25.4a3.209,3.209,0,0,0,3.2,3.2H31.8A3.209,3.209,0,0,0,35,25.4V6.2A3.209,3.209,0,0,0,31.8,3ZM30.2,17.4H23.8v6.4H20.6V17.4H14.2V14.2h6.4V7.8h3.2v6.4h6.4Z'
                transform='translate(-3 -3)'
                fill={color}
            />
        </svg>
    )
}

export default AddPhotosIcon

AddPhotosIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
