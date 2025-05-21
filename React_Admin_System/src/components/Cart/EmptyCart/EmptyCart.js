import React from 'react'
import PropTypes from 'prop-types'
import './EmptyCart.css'
import EmptyEnvelope from '../../../svg/EmptyEnvelope'

const EmptyCart = ({ isLoggedIn }) => {
    const endpoint = window.Shopify.ssoEndPoint
    return (
        <div className='empty-cart' onClick={(e) => e.stopPropagation()}>
            <EmptyEnvelope width={210} height={210} color='black' />

            <h2 className='empty-cart-text'>Oh No, it seems your basket is empty!</h2>

            <a href='/' className='empty-cart-button'>
                Shop Now
            </a>
            {!isLoggedIn && (
                <>
                    <p className='empty-cart-login-title'>Have an account?</p>
                    <a href='/account/login' className='empty-cart-login-link'>
                        Login
                    </a>
                    <p className='empty-cart-login-title'>To checkout faster</p>
                    <div class="separator-basket">
                        <hr class="line"/>
                        <span>or</span>
                        <hr class="line"/>
                        </div>
                        <div class="auth-buttons-basket">
                        
                        <a href={`${endpoint}/v1/shoppify/private/google_auth?returnUrl=cart`}       
                            class="auth-button auth-button--google"
                        >
                            <span class="auth-button__content">
                            <span class="auth-button__icon">
                                <img src="https://static.web-purchase.prod.moonpig.net/_next/static/images/GoogleLogo-51a7dc6fea30cadc70a2f35ba28988e7.svg" alt="Google logo"/>
                            </span>
                            Continue with Google
                            </span>
                        </a>
                        
                            <a class="auth-button auth-button--facebook" 
                            href={`${endpoint}/v1/shoppify/private/facebook_auth?returnUrl=cart`}>
                            <span class="auth-button__content">
                            <span class="auth-button__icon">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Apple logo"/>
                            </span>
                            Continue with Facebook
                            </span>
                        </a>
                        </div>
                </>
            )}
                    </div>
    )
}

export default EmptyCart

EmptyCart.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}
