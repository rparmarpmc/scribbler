import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './GiftModalContent.css'
import GiftItem from './GiftItem'
import Spinner from '../../../Spinner/Spinner'
import { getGiftProductsFromCollection } from '../../../../middlewares/api'

const GiftModalContent = ({ item, setIsGiftModalOpen }) => {
    const [gifts, setGifts] = useState([])

    useEffect(() => {
        document.body.classList.add('no-scroll')
        getGifts(item)
    }, [])

    const getGifts = async (item) => {
        const gifts = await getGiftProductsFromCollection(item.product_id)

        const products = gifts.products

        let noZeroQuantityVariants = products.map((product) => {
            let variants = product.variants

            let newVariants = variants.filter((variant) => {
                return variant.inventory_quantity > 0
            })

            product.variants = newVariants
            return product
        })
        // filter out product with no variants
        let noEmptyProducts = noZeroQuantityVariants.filter((variant) => {
            return variant.variants.length > 0
        })

        setGifts(noEmptyProducts)
    }

    return (
        <div
            className='gift-modal-backdrop'
            onClick={() => {
                document.body.classList.remove('no-scroll')
                setIsGiftModalOpen(false)
            }}
        >
            <div className='gift-modal-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='cart-gift-modal-header'>Add a Gift</div>
                {gifts?.length === 0 && (
                    <div className='cart-gift-modal-loading'>
                        <Spinner size={46} color={'black'} />
                    </div>
                )}
                <div className='cart-gift-modal-content'>
                    {gifts?.length > 0 &&
                        gifts.map((gift, index) => {
                            return <GiftItem key={index} setIsGiftModalOpen={setIsGiftModalOpen} item={item} gift={gift} />
                        })}
                </div>
                <div className='cart-gift-modal-footer'>
                    <button
                        className='cart-gift-modal-cancel-button'
                        onClick={() => {
                            document.body.classList.remove('no-scroll')
                            setIsGiftModalOpen(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GiftModalContent

GiftModalContent.propTypes = {
    item: PropTypes.object.isRequired,
    setIsGiftModalOpen: PropTypes.func.isRequired
}
