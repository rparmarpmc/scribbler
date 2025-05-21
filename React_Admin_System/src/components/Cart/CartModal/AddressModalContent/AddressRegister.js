import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import './AddressRegister.css'
import Spinner from '../../../Spinner/Spinner'
import { registerUser } from '../../../../store/actions'
import ArrowLeftIcon from '../../../../svg/ArrowLeftIcon'

const AddressRegister = ({ setRegister }) => {
    const dispatch = useDispatch()
    const registerErrors = useSelector((state) => state.registerErrors)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [privacy, setPrivacy] = useState(false)
    const [terms, setTerms] = useState(false)
    const [offers, setOffers] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateEmail = (email) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true

        return false
    }

    const validateForm = () => {
        let errors = {}
        let formIsValid = true

        if (!firstName) {
            formIsValid = false
            errors.firstName = '*First name is required.'
        }
        if (!lastName) {
            formIsValid = false
            errors.lastName = '*Last name is required.'
        }

        if (!email) {
            formIsValid = false
            errors.email = '*Email is required.'
        }

        if (email?.length > 0 && validateEmail(email)) {
            formIsValid = false
            errors.email = '*Email is invalid.'
        }

        if (!password) {
            formIsValid = false
            errors.password = '*Pasword is required.'
        }

        if (!privacy) {
            formIsValid = false
            errors.privacy = '*You must read and agree to our Privacy Policy.'
        }

        if (!terms) {
            formIsValid = false
            errors.terms = '*You must read and agree to our Terms and Condition.'
        }
        console.log('errors >>>', errors)
        setErrors(errors)
        return formIsValid
    }

    const register = () => {
        console.log('register >>>')
        if (validateForm()) {
            setLoading(true)
            dispatch(registerUser({ firstName, lastName, email, password, privacy, terms, offers }))
        }
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            setLoading(false)
        }
    }, [registerErrors])

    return (
        <div className='cart-page-register'>
            <div className='cart-page-register-header'>
                <div className='cart-page-register-message'>Please register to save addresses</div>
                <button className='cart-page-register-go-back-to-login' type='button' onClick={() => setRegister(false)}>
                    <ArrowLeftIcon width={28} height={28} color='black' />
                </button>
            </div>

            {registerErrors &&
                registerErrors.map((error, index) => {
                    return (
                        <div className='register-error' key={index}>
                            {error}
                        </div>
                    )
                })}

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.firstName}</div>
                <input
                    type='text'
                    name='firstName'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='First name'
                    value={firstName ? firstName : ''}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) register()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.lastName}</div>
                <input
                    type='text'
                    name='lastName'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Last name'
                    value={lastName ? lastName : ''}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) register()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.email}</div>
                <input
                    type='text'
                    name='email'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Email'
                    value={email ? email : ''}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) register()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.password}</div>
                <input
                    type='password'
                    name='password'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Password'
                    value={password ? password : ''}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) register()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.privacy}</div>
                <div className='cart-page-register-checkbox'>
                    <input type='checkbox' checked={privacy} id='privacy' onChange={() => setPrivacy(!privacy)} />
                    <label htmlFor='privacy'></label>
                </div>
                <label htmlFor='privacy' className='cart-page-register-checkbox-label'>
                    Select to accept Privacy Policy
                </label>
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-field-error'>{errors.terms}</div>
                <div className='cart-page-register-checkbox'>
                    <input type='checkbox' checked={terms} id='terms' onChange={() => setTerms(!terms)} />
                    <label htmlFor='terms'></label>
                </div>
                <label htmlFor='terms' className='cart-page-register-checkbox-label'>
                    Select to agree to Terms & Conditions
                </label>
            </div>

            <div className='cart-page-register-field'>
                <div className='cart-page-register-checkbox'>
                    <input type='checkbox' checked={offers} id='offers' onChange={() => setOffers(!offers)} />
                    <label htmlFor='offers'></label>
                </div>
                <label htmlFor='offers' className='cart-page-register-checkbox-label'>
                    Select to receive Offers & News
                </label>
            </div>

            <button type='button' className={`cart-page-register-button ${loading ? 'loading' : ''}`} onClick={() => register()}>
                Sign Up
                <Spinner size={25} color={'black'} />
            </button>
        </div>
    )
}

export default AddressRegister

AddressRegister.propTypes = {
    setRegister: PropTypes.func.isRequired
}
