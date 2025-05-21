import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './AlphabetItem.css'
class AlphabetItem extends Component {
    componentDidMount() {
        // console.log('here we have weird offset >>>')
        this.props.registerPos(this.props.id, this.fix.offsetTop - 307)
    }

    render() {
        const { id } = this.props

        return (
            <div
                className='address-alphabet-group'
                ref={(ref) => {
                    this.fix = ref
                }}
            >
                <div className='address-alphabet-group-title'>{`${id}`}</div>
                <div className='address-alphabet-group-children-wrapper'>{this.props.children}</div>
            </div>
        )
    }
}
export default AlphabetItem

AlphabetItem.propTypes = {
    children: PropTypes.array.isRequired,
    registerPos: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}
