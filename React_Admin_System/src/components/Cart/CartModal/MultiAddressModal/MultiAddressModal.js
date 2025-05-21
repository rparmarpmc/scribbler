import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './MultiAddressModal.css'
import SendToYou from '../../../../svg/SendToYou'
import SendToThem from '../../../../svg/SendToThem'

const MultiAddressModal = ({ setIsTypeMultiAddressModalOpen, saveSingleAddress, saveMultiAddresses, addressType, setAddressType, cartContent }) => {
    const [multiAddressSet, setMultiAddressSet] = useState(false)

    const isSingle = () => {
        if (cartContent.items.length === 1) {
            return true
        } else if (cartContent.items.length === 2 && cartContent.items.some((item) => Object.hasOwn(item, 'gift'))) {
            return true
        } else {
            return false
        }
    }

    const saveAddress = () => {
        multiAddressSet ? saveMultiAddresses() : saveSingleAddress()
    }

    useEffect(() => {
        if (!isSingle()) setMultiAddressSet(true)
    }, [])

    return (
        <div
            className='cart-muliaddress-modal-backdrop'
            onClick={() => {
                setIsTypeMultiAddressModalOpen(false)
            }}
        >
            <div className='cart-muliaddress-modal-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='cart-muliaddress-modal-title'>Send to?</div>
                <div className='cart-muliaddress-modal-shiping-type'>
                    <button className={`send-to-button ${addressType === 'Direct' ? 'active' : ''}`} onClick={() => setAddressType('Direct')}>
                        <div className='send-to-info-wrapper'>
                            <div className='send-to-info-title'>Send directly to them</div>
                            <div className='send-to-info-description'>We&apos;ll seal the envelope and deliver it straight to their door.</div>
                        </div>
                        <div className='send-to-icon'>
                            <SendToThem width={100} height={100} color='black' />
                        </div>
                    </button>
                    <button className={`send-to-button ${addressType === 'Indirect' ? 'active' : ''}`} onClick={() => setAddressType('Indirect')}>
                        <div className='send-to-info-wrapper'>
                            <div className='send-to-info-title'>Send it to yourself</div>
                            <div className='send-to-info-description'>We&apos;ll include an extra envelope so you can deliver it yourself.</div>
                        </div>
                        <div className='send-to-icon'>
                            <SendToYou width={100} height={100} color='black' />
                        </div>
                    </button>
                </div>
                {!isSingle() && (
                    <>
                        <div className='cart-muliaddress-modal-content'>
                            Would you like this Address
                            <br /> to be added to all basket items?
                        </div>
                        <div className='cart-muliaddress-selector'>
                            <button className={`cart-muliaddress-button ${!multiAddressSet ? 'active' : ''}`} onClick={() => setMultiAddressSet(false)}>
                                No
                            </button>
                            <button className={`cart-muliaddress-button ${multiAddressSet ? 'active' : ''}`} onClick={() => setMultiAddressSet(true)}>
                                Yes
                            </button>
                        </div>
                    </>
                )}

                <div className='cart-muliaddress-modal-footer'>
                    <button className='cart-muliaddress-cancel' onClick={() => setIsTypeMultiAddressModalOpen(false)}>
                        Cancel
                    </button>
                    <button className='cart-muliaddress-confirm' onClick={() => saveAddress()}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MultiAddressModal

MultiAddressModal.propTypes = {
    setIsTypeMultiAddressModalOpen: PropTypes.func.isRequired,
    saveMultiAddresses: PropTypes.func.isRequired,
    saveSingleAddress: PropTypes.func.isRequired,
    addressType: PropTypes.string.isRequired,
    setAddressType: PropTypes.func.isRequired,
    cartContent: PropTypes.object.isRequired
}
