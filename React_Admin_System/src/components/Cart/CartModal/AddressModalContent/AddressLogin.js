import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import './AddressLogin.css'
import Spinner from '../../../Spinner/Spinner'
import { loginUser } from '../../../../store/actions'

const AddressLogin = ({ setRegister, switchTab }) => {
    const dispatch = useDispatch()
    const loginErrors = useSelector((state) => state.loginErrors)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateEmail = (email) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true

        return false
    }

    const validateForm = () => {
        let errors = {}
        let formIsValid = true

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

        setErrors(errors)
        return formIsValid
    }

    const login = () => {
        if (validateForm()) {
            setLoading(true)
            dispatch(loginUser({ email, password, returnUrl: 'cart' }))
        }
    }

    useEffect(() => {
        if (loginErrors.length > 0) {
            setLoading(false)
        }
    }, [loginErrors])

    return (
        <div className='cart-page-login'>
            <div className='cart-page-login-message'>Please Login to see your list of saved addresses</div>
            {loginErrors &&
                loginErrors.map((error, index) => {
                    return (
                        <div className='cart-page-login-error' key={index}>
                            {error}
                        </div>
                    )
                })}
            <div className='address-field-login-box'>
                <div className='address-field-login-box-error'>{errors.email}</div>
                <input
                    type='email'
                    name='email'
                    autoCorrect='off'
                    autoComplete='off'
                    role='presentation'
                    placeholder='Email address'
                    value={email ? email : ''}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) login()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <div className='address-field-login-box'>
                <div className='address-field-login-box-error'>{errors.password}</div>
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
                        if (e.keyCode == 13) login()
                    }}
                    onFocus={(e) => (e.target.placeholder = '')}
                />
            </div>

            <button className={`login-register-button ${loading ? 'loading' : ''}`} type='button' onClick={() => login()}>
                Login
                <Spinner size={25} color={'black'} />
            </button>
            <div className='login-register-button-forgotten'>
                <a href='/account/register'>Forgotten Password?</a>
            </div>

            <div className='address-member-message'>Not yet a member?</div>

            <button className='login-register-button' type='button' onClick={() => setRegister(true)}>
                Register New Account
            </button>
            <button className='guest-checkout-button' type='button' onClick={() => switchTab('new')}>
                Continue as Guest
            </button>
        </div>
    )
}

export default AddressLogin

AddressLogin.propTypes = {
    setRegister: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired
}
