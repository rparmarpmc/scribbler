import React from 'react'
import PropTypes from 'prop-types'

import './MultiBuy.css'
import PlusButton from '../../../svg/PlusButton'

const Cart = ({ cartContent }) => {
    let cardCounter = []
    let filteredCardsOnly = []

    const goToAllCards = () => {
        window.location = '/'
    }

    if (cartContent.items) {
        filteredCardsOnly = cartContent.items.filter((item) => {
            if (item.product_type === 'Cards') {
                return true
            }
            return false
        })
    }

    if (filteredCardsOnly.length > 0) {
        filteredCardsOnly.map((item) => {
            if (item.quantity === 1) {
                cardCounter.push(item)
            } else {
                let i = 0
                do {
                    i += 1
                    cardCounter.push(item)
                } while (i < item.quantity)
            }
        })
    }

    return (
        <div className='multibuy-wrapper'>
            <div className='multibuy-grid-card-1'>
                {cardCounter[0] ? (
                    <img src={cardCounter[0].image} alt={cardCounter[0].title} loading='lazy' />
                ) : (
                    <button className='multibuy-add-card-button' name='plus' type='button' onClick={() => goToAllCards()}>
                        <PlusButton width={14} height={14} color='#ffffff' />
                    </button>
                )}
            </div>
            <div className='multibuy-grid-card-2'>
                {cardCounter[1] ? (
                    <img src={cardCounter[1].image} alt={cardCounter[1].title} loading='lazy' />
                ) : (
                    <button className='multibuy-add-card-button' name='plus' type='button' onClick={() => goToAllCards()}>
                        <PlusButton width={14} height={14} color='#ffffff' />
                    </button>
                )}
            </div>
            <div className='multibuy-grid-card-3'>
                {cardCounter[2] ? (
                    <img src={cardCounter[2].image} alt={cardCounter[2].title} loading='lazy' />
                ) : (
                    <button className='multibuy-add-card-button' name='plus' type='button' onClick={() => goToAllCards()}>
                        <PlusButton width={14} height={14} color='#ffffff' />
                    </button>
                )}
            </div>
            <div className='multibuy-grid-equal-sign'>=</div>
            <div className='multibuy-grid-card-4'>
                {cardCounter.length > 3 && <img src={cardCounter[3].image} alt={cardCounter[3].title} loading='lazy' />}
                {cardCounter.length < 3 && (
                    <div className='free-card-text'>
                        FREE
                        <br />
                        CARD
                    </div>
                )}
                {cardCounter.length === 3 && (
                    <button className='multibuy-add-free-card-button' name='plus' type='button' onClick={() => goToAllCards()}>
                        FREE
                        <br />
                        CARD
                        <PlusButton width={14} height={14} color='#ffffff' />
                    </button>
                )}
            </div>
            <div className='multibuy-card-promo-text'>
                <span className='multibuy-card-promo-text-top'>
                    {cardCounter.length === 1 && <>You&apos;re only 2 cards away from a</>}
                    {cardCounter.length === 2 && <>You&apos;re only 1 card away from a</>}
                    {cardCounter.length === 3 && <>Claim your</>}
                    {cardCounter.length > 3 && <>Winner winner! You&apos;ve bagged a</>}
                </span>
                <span className='multibuy-card-promo-text-bottom'>FREE CARD!</span>
            </div>
        </div>
    )
}

export default Cart

Cart.propTypes = {
    cartContent: PropTypes.object.isRequired
}
