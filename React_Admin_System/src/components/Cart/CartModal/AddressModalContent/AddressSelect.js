import React from 'react'
import PropTypes from 'prop-types'

import ArrowRightIcon from '../../../../svg/ArrowRightIcon'
import './AddressSelect.css'

const AddressSelect = ({ closeSuggestionsModal, addressSuggestions, selectSuggestedAddress, selectSuggestedPostcode }) => {
    return (
        <div
            className='suggestionsBackdrop'
            onClick={(e) => {
                e.stopPropagation()
                closeSuggestionsModal()
            }}
        >
            <div className='addressSugestionsWrapper'>
                <div className='addressSugestionsTitle'>Select address</div>
                <div className='addressSugestions'>
                    {addressSuggestions.map((suggestion, index) => {
                        if (suggestion.Type === 'Address') {
                            return (
                                <button key={index} className='addressSugestionsButton' onClick={() => selectSuggestedAddress(suggestion.Id)}>
                                    <span className='addressText'>{suggestion.Text}</span>
                                    <span className='addressDescription'>{suggestion.Description}</span>
                                </button>
                            )
                        } else {
                            return (
                                <button
                                    key={index}
                                    className='addressSugestionsButton postcodeSelector'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        selectSuggestedPostcode(suggestion.Id)
                                    }}
                                >
                                    <div className='postcodeSelectorLeft'>
                                        <span className='addressText'>{suggestion.Text}</span>
                                        <span className='addressDescription'>{suggestion.Description}</span>
                                    </div>
                                    <div className='postcodeSelectorRight'>
                                        <ArrowRightIcon width={28} height={28} color='black' />
                                    </div>
                                </button>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddressSelect

AddressSelect.propTypes = {
    closeSuggestionsModal: PropTypes.func.isRequired,
    addressSuggestions: PropTypes.array.isRequired,
    selectSuggestedAddress: PropTypes.func.isRequired,
    selectSuggestedPostcode: PropTypes.func.isRequired
}
