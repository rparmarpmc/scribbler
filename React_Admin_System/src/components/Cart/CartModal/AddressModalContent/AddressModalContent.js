import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import './AddressModalContent.css'
import AddressNew from './AddressNew'
import AddressLogin from './AddressLogin'
import AddressBoook from './AddressBoook'
import AddressRegister from './AddressRegister'
import MultiAddressModal from '../MultiAddressModal/MultiAddressModal'
import { apiAddAddressAndDefaultPostage, apiAddMultipleAddressesAndDefaultPostage } from '../../../../store/actions'

const AddressModalContent = ({ setIsModalOpen, item, customerName, isLoggedIn, cartContent }) => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('book')
    const [register, setRegister] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [city, setCity] = useState()
    const [province, setProvince] = useState()
    const [country, setCountry] = useState('United Kingdom')
    const [zip, setZip] = useState()
    const [phone, setPhone] = useState()
    const [addressType, setAddressType] = useState('Indirect')
    const [errors, setErrors] = useState({})
    const [isTypeMultiAddressModalOpen, setIsTypeMultiAddressModalOpen] = useState(false)
    const [allowAddAddress, setAllowAddAddress] = useState(false)

    useEffect(() => {
        document.body.classList.add('no-scroll')
        if (item.properties._shipping_address) {
            const addressObject = JSON.parse(item.properties['_shipping_address'])

            setFirstName(addressObject.firstName)
            setLastName(addressObject.lastName)
            setAddress1(addressObject.address1)
            setAddress2(addressObject.address2)
            setCity(addressObject.city)
            setProvince(addressObject.province)
            setCountry(addressObject.country)
            setZip(addressObject.zip)
            setPhone(addressObject.phone)
            setAddressType(addressObject.addressType)
        }
    }, [])

    const saveMultiAddresses = () => {
        setIsTypeMultiAddressModalOpen(false)

        let address = {
            firstName: firstName.length > 0 ? firstName.trim() : '',
            lastName: lastName.length > 0 ? lastName.trim() : '',
            address1: address1.length > 0 ? address1.trim() : '',
            address2: address2 && address2.length > 0 ? address2.trim() : '',
            city: city.length > 0 ? city.trim() : '',
            province: province?.length > 0 ? province.trim() : '',
            country: country ? country : 'United Kingdom',
            zip: zip.length > 0 ? zip.trim() : '',
            phone: phone && phone.length > 0 ? phone.trim() : '',
            addressType: addressType.length > 0 ? addressType.trim() : ''
        }

        dispatch(apiAddMultipleAddressesAndDefaultPostage({ address }))
        document.body.classList.remove('no-scroll')
        setIsModalOpen(false)
    }

    const saveSingleAddress = () => {
        let address = {
            firstName: firstName.length > 0 ? firstName.trim() : '',
            lastName: lastName.length > 0 ? lastName.trim() : '',
            address1: address1.length > 0 ? address1.trim() : '',
            address2: address2 && address2.length > 0 ? address2.trim() : '',
            city: city.length > 0 ? city.trim() : '',
            province: province?.length > 0 ? province.trim() : '',
            country: country ? country : 'United Kingdom',
            zip: zip.length > 0 ? zip.trim() : '',
            phone: phone && phone.length > 0 ? phone.trim() : '',
            addressType: addressType.length > 0 ? addressType.trim() : ''
        }

        dispatch(apiAddAddressAndDefaultPostage({ item, address }))
        document.body.classList.remove('no-scroll')
        setIsModalOpen(false)
    }

    const saveAddress = () => {
        if (activeTab === 'new') {
            if (validateForm(true)) {
                setIsTypeMultiAddressModalOpen(true)
            }
        }
    }

    const switchTab = (tab) => {
        setActiveTab(tab)
    }

    const changeAddress = (address) => {
        setFirstName(address.first_name)
        setLastName(address.last_name)
        setAddress1(address.address1)
        setAddress2(address.address2)
        setCity(address.city)
        setProvince(address.county)
        setCountry(address.country_name)
        setZip(address.postcode)
        setPhone(address.phone)
        setAddressType(address.type)
    }

    const validateForm = (validateErrors) => {
        let errors = {}
        let formIsValid = true

        if (!firstName) {
            formIsValid = false
            errors.firstName = '*First Name is required.'
        }

        if (!lastName) {
            formIsValid = false
            errors.lastName = '*Last Name is required.'
        }

        if (!address1) {
            formIsValid = false
            errors.address1 = '*Address line 1 is required.'
        }

        if (!city) {
            formIsValid = false
            errors.city = '*City is required.'
        }

        if (!zip) {
            formIsValid = false
            errors.zip = '*Postcode is required.'
        }

        if (validateErrors) {
            setErrors(errors)
        }
        return formIsValid
    }

    useEffect(() => {
        if (validateForm(false)) {
            setAllowAddAddress(true)
        } else {
            setAllowAddAddress(false)
        }
    }, [firstName, lastName, address1, address2, city, province, country, zip, addressType])

    return (
        <div
            className='cart-modal-backdrop'
            onClick={() => {
                document.body.classList.remove('no-scroll')
                setIsModalOpen(false)
            }}
        >
            <div className='cart-modal-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='cart-address-modal'>
                    {isTypeMultiAddressModalOpen && (
                        <MultiAddressModal
                            cartContent={cartContent}
                            addressType={addressType}
                            setAddressType={setAddressType}
                            setIsTypeMultiAddressModalOpen={setIsTypeMultiAddressModalOpen}
                            saveMultiAddresses={saveMultiAddresses}
                            saveSingleAddress={saveSingleAddress}
                        />
                    )}
                    <div className='cart-address-modal-header'>Address</div>
                    <div className='cart-address-modal-content'>
                        <div className='cart-address-tabs'>
                            <a href='#' className={activeTab === 'new' ? 'cart-address-tab-link address-tab-active' : 'cart-address-tab-link'} onClick={() => switchTab('new')}>
                                Add Address
                            </a>
                            <a href='#' className={activeTab === 'book' ? 'cart-address-tab-link address-tab-active' : 'cart-address-tab-link'} onClick={() => switchTab('book')}>
                                Address Book
                            </a>
                        </div>
                        {!isTypeMultiAddressModalOpen && activeTab === 'new' && (
                            <AddressNew
                                item={item}
                                errors={errors}
                                firstName={firstName}
                                lastName={lastName}
                                address1={address1}
                                address2={address2}
                                city={city}
                                province={province}
                                country={country}
                                zip={zip}
                                phone={phone}
                                addressType={addressType}
                                setFirstName={setFirstName}
                                setLastName={setLastName}
                                setAddress1={setAddress1}
                                setAddress2={setAddress2}
                                setCity={setCity}
                                setProvince={setProvince}
                                setCountry={setCountry}
                                setZip={setZip}
                                setPhone={setPhone}
                                setAddressType={setAddressType}
                            />
                        )}
                        {/* address book login */}
                        {activeTab === 'book' && !isLoggedIn && !register && <AddressLogin setRegister={setRegister} switchTab={switchTab} />}
                        {/* address book register */}
                        {activeTab === 'book' && !isLoggedIn && register && <AddressRegister setRegister={setRegister} />}
                        {/* address selector */}
                        {activeTab === 'book' && isLoggedIn && <AddressBoook changeAddress={changeAddress} customerName={customerName} switchTab={switchTab} />}
                    </div>
                    {activeTab === 'new' && (
                        <div className='cart-address-modal-footer'>
                            <button
                                className='cart-address-modal-cancel-button'
                                onClick={() => {
                                    document.body.classList.remove('no-scroll')
                                    setIsModalOpen(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button className={`cart-address-modal-confirm-button ${allowAddAddress ? '' : 'disabled'}`} onClick={() => saveAddress()}>
                                Confirm
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddressModalContent

AddressModalContent.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    customerName: PropTypes.string,
    cartContent: PropTypes.object.isRequired
}
