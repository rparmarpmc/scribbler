import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import './AddressBoook.css'
import AlphabetList from './AlphabetList'

const AddressBoook = ({ changeAddress, switchTab, customerName }) => {
    const [addressType] = useState(false)
    const [selectList, setSelectList] = useState(false)
    const userAddresses = useSelector((state) => state.userAddresses)
    const [customerNameAddresses, setCustomerNameAddresses] = useState()
    const [otherAddresses, setOtherAddresses] = useState()
    let customerNameAddressesAccum = []
    let otherAddressesAccum = []

    useEffect(() => {
        if (userAddresses) {
            userAddresses.map((address) => {
                if (address.first_name + ' ' + address.last_name === customerName) {
                    customerNameAddressesAccum.push(address)
                } else {
                    otherAddressesAccum.push(address)
                }
            })
            setCustomerNameAddresses(customerNameAddressesAccum)
            setOtherAddresses(otherAddressesAccum)
        }
    }, [userAddresses])

    return (
        <div className='cart-page-address-book'>
            <div className='cart-page-address-book-field'>
                <button className={`cart-page-address-select-button ${selectList ? 'open' : 'closed'}`} type='button' onClick={() => setSelectList(!selectList)}>
                    My Back To Me Addresses
                </button>
                <div className={`cart-page-address-select-list ${selectList ? 'open' : 'closed'}`}>
                    <ul className='cart-page-address-select-list-ul'>
                        {customerNameAddresses &&
                            customerNameAddresses.map((address, index) => {
                                return (
                                    <li
                                        key={index}
                                        className='cart-page-address-select-list-ul-li'
                                        onClick={() => {
                                            changeAddress({ ...customerNameAddresses[index], type: 'Indirect' })
                                            switchTab('new')
                                        }}
                                    >
                                        {address.first_name ? address.first_name + ' ' : null}
                                        {address.last_name ? address.last_name + ', ' : null}
                                        {address.city ? address.city + ', ' : null}
                                        {address.postcode ? address.postcode : null}
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>

            <div className='cart-page-address-selector-wrapper'>
                {otherAddresses && (
                    <AlphabetList
                        data={otherAddresses}
                        nameKey={'first_name'}
                        generateFn={(address, index) => {
                            return (
                                <button
                                    className='cart-page-address-selector-button'
                                    key={index}
                                    onClick={() => {
                                        changeAddress({ ...address, type: addressType ? 'Indirect' : 'Direct' })
                                        switchTab('new')
                                    }}
                                >
                                    {address.first_name ? address.first_name + ' ' : null}
                                    {address.last_name ? address.last_name + ', ' : null}
                                    {address.city ? address.city + ', ' : null}
                                    {address.postcode ? address.postcode : null}
                                </button>
                            )
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default AddressBoook

AddressBoook.propTypes = {
    changeAddress: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    customerName: PropTypes.string
}
