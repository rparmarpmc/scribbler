import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './AlphabetList.css'
import AlphabetItem from './AlphabetItem'

const mapArrToMap = (arr, nameKey) => {
    const map = new Map()
    const Regx = /^[A-Za-z]$/
    arr.forEach((item) => {
        const itemName = nameKey ? item[nameKey] : item
        let firstChar = itemName[0]
        if (!Regx.test(firstChar)) {
            firstChar = '#'
        } else {
            firstChar = firstChar.toUpperCase()
        }
        if (map.get(firstChar) == null) {
            map.set(firstChar, [item])
        } else {
            const arr = map.get(firstChar)
            arr.push(item)
            map.set(firstChar, arr)
        }
    })
    return map
}
class AlphabetList extends Component {
    constructor(props) {
        super(props)
        this.mapPos = null
    }

    state = {
        mapPos: null
    }

    registerPos = (id, top) => {
        if (this.mapPos) {
            this.mapPos.set(id, top)
        }

        this.setState({ mapPos: this.mapPos })
    }

    handleAlphaClick = (char) => {
        this.scroller.scrollTop = this.state.mapPos.get(char)
    }

    render() {
        const { generateFn, data, nameKey } = this.props
        const map = mapArrToMap(data, nameKey)
        this.mapPos = new Map()
        const keyArr = Array.from(map.keys())
        keyArr.sort()

        return (
            <div className='address-selector-wrapper-list'>
                <div
                    className='address-scroll-container'
                    ref={(ref) => {
                        this.scroller = ref
                    }}
                >
                    {keyArr.map((char) => {
                        if (map.get(char) != null) {
                            return (
                                <AlphabetItem id={`${char}`} key={char} registerPos={this.registerPos}>
                                    {map.get(char).map((item, index) => {
                                        return generateFn(item, index)
                                    })}
                                </AlphabetItem>
                            )
                        }
                    })}
                </div>
                <div className='address-alphabet-selector'>
                    {keyArr.map((item) => {
                        return (
                            <div
                                key={item}
                                className='address-alphabet-selector-item'
                                onClick={() => {
                                    this.handleAlphaClick(item)
                                }}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default AlphabetList

AlphabetList.propTypes = {
    generateFn: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    nameKey: PropTypes.string
}
