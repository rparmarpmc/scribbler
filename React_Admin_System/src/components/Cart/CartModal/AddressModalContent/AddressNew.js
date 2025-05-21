import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './AddressNew.css'
import CountrySelect from './CountrySelect'
import AddressSelect from './AddressSelect'
import { removeSuggestions, apiGetPostcodeSuggestions, apiGetAddressSuggestions } from '../../../../store/actions'
import { getAutocompleteAddressDetails } from '../../../../middlewares/api'
import { LOGATE_ADDRESS_API_KEY } from '../../../../config'

const AddressNew = ({ errors, firstName, lastName, address1, address2, city, province, country, zip, setFirstName, setLastName, setAddress1, setAddress2, setCity, setProvince, setCountry, setZip }) => {
    const dispatch = useDispatch()
    const addressSuggestions = useSelector((state) => state.addressSuggestions)

    const selectSuggestedAddress = async (id) => {
        const addressDetails = await getAutocompleteAddressDetails(id, LOGATE_ADDRESS_API_KEY)

        if (addressDetails?.Items?.[0]) {
            setAddress1(addressDetails?.Items?.[0].Line1)
            setAddress2(addressDetails?.Items?.[0].Line2)
            setCity(addressDetails?.Items?.[0].City)
            setProvince(addressDetails?.Items?.[0].Province)
            setCountry(addressDetails?.Items?.[0].CountryName)
            setZip(addressDetails?.Items?.[0].PostalCode)
        }
    }

    const selectSuggestedPostcode = async (id) => {
        dispatch(apiGetPostcodeSuggestions({ zip, country, id }))
    }

    const closeSuggestionsModal = () => {
        dispatch(removeSuggestions())
    }

    const fetchData = (field, value) => {
        if (field === 'setZip') setZip(value)
        if (value.length > 2) dispatch(apiGetAddressSuggestions({ term: value, country: country }))
    }

    return (
        <div className='cart-page-new-address'>
            <CountrySelect country={country} setCountry={setCountry} />

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.zip}</div>
                <input
                    type='text'
                    name='address[zip]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Postcode finder'
                    value={zip ? zip : ''}
                    onChange={(e) => fetchData('setZip', e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'Postcode finder'
                        }
                    }}
                />
                {addressSuggestions.length > 0 && (
                    <AddressSelect selectSuggestedAddress={selectSuggestedAddress} selectSuggestedPostcode={selectSuggestedPostcode} addressSuggestions={addressSuggestions} closeSuggestionsModal={closeSuggestionsModal} />
                )}
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.firstName}</div>
                <input
                    type='text'
                    name='address[firstName]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='First name'
                    value={firstName ? firstName : ''}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'First name'
                        }
                    }}
                />
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.lastName}</div>
                <input
                    type='text'
                    name='address[lastName]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Last name'
                    value={lastName ? lastName : ''}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'Last name'
                        }
                    }}
                />
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.address1}</div>
                <input
                    type='text'
                    name='address[firstLine]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Address line 1'
                    value={address1 ? address1 : ''}
                    onChange={(e) => setAddress1(e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'Address line 1'
                        }
                    }}
                />
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.address2}</div>
                <input
                    type='text'
                    name='address[secondLine]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Address line 2'
                    value={address2 ? address2 : ''}
                    onChange={(e) => setAddress2(e.target.value)}
                    onFocus={(e) => (e.target.placeholder = '')}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'Address line 2'
                        }
                    }}
                />
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.city}</div>
                <input
                    type='text'
                    name='address[townCity]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='City'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'City'
                        }
                    }}
                />
            </div>

            <div className='address-field-box'>
                <div className='address-field-error'>{errors.province}</div>
                <input
                    type='text'
                    name='address[countyState]'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='County'
                    value={province ? province : ''}
                    onChange={(e) => setProvince(e.target.value)}
                    onFocus={(e) => {
                        e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.placeholder = 'County'
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default AddressNew

AddressNew.propTypes = {
    item: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    country: PropTypes.string,
    zip: PropTypes.string,
    phone: PropTypes.string,
    addressType: PropTypes.string,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setAddress1: PropTypes.func.isRequired,
    setAddress2: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    setProvince: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    setZip: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setAddressType: PropTypes.func.isRequired
}
