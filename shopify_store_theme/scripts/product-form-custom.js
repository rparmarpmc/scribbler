if (!customElements.get('product-form-custom-card')) {
    customElements.define(
        'product-form-custom-card',
        class ProductForm extends HTMLElement {
            constructor() {
                super()

                this.unsubscribe = false
                this.form = this.querySelector('form')
                this.form.querySelector('[name=id]').disabled = false
                this.form.addEventListener('submit', this.onSubmitHandler.bind(this))
                this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer')
                this.submitButton = this.querySelector('[type="submit"]')
                if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog')
            }

            getDefaultDelivery = async () => {
                var defaultUserAddress = document.querySelector('[name="default_shipping_address"]')?.value

                if (defaultUserAddress?.length > 0) {
                    const address = JSON.parse(defaultUserAddress)

                    const fieldsets = Array.from(document.querySelectorAll('fieldset'))
                    let options = fieldsets.map(fieldset => {
                        if (fieldset.querySelectorAll('input').length > 0) {
                            return Array.from(fieldset.querySelectorAll('input')).find(radio => radio.checked).value
                        }
                    })

                    let productType = document.querySelector('[name="product_type"]')?.value
                    let variantTitle = options[0]

                    let product_type = 1 //1-Card 2-Gifts 3-Alcohol
                    let product_size = 1 //1- Standard 2-Large

                    switch (productType) {
                        case 'Cards':
                            product_type = 1
                            product_size = variantTitle.includes('Standard') ? 1 : 2
                            break
                        case 'Gifts':
                            product_type = 2
                            break
                        case 'Alcohol':
                            product_type = 3
                            break
                        default:
                            product_type = 1
                            break
                    }

                    const data = [
                        {
                            product_type: product_type,
                            product_size: product_size,
                            product_quantity: 1,
                            address: { line: `${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}`, postcode: address.zip, country: countryToCode(address.country) },
                            attached_products: []
                        }
                    ]

                    let response = await fetch(`/apps/scribblerApi/v1/delivery-options`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: `application/json` },
                        body: JSON.stringify(data)
                    })

                    return response.json()
                }
            }

            saveItemChange = async(quantity, key, properties) => {
                const data = {
                    id: key,
                    quantity: quantity,
                    properties: properties
                }

                return fetch(`/cart/change.js`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                    .then(response => response.json())
                    .catch(error => {
                        throw error
                    })
            }

            removeItem = async( key ) => {
                const data = {
                    id: key,
                    quantity: 0
                }

                return fetch(`/cart/change.js`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
                    .then(response => response.json())
                    .catch(error => {
                        throw error
                    })
            }

            addNewItem = async(quantity, variantId, properties) => {
                const data = {
                    id: variantId,
                    quantity: quantity,
                    properties: properties
                }

                return fetch(`/cart/add.js`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                    .then(response => response.json())
                    .catch(error => {
                        throw error
                    })
            }
           
            async addToCart(evt) {
                evt.preventDefault()
                if (this.submitButton.getAttribute('aria-disabled') === 'true') return

                this.handleErrorMessage()

                this.submitButton.setAttribute('aria-disabled', true)
                this.submitButton.classList.add('loading')
                this.querySelector('.loading-overlay__spinner').classList.remove('hidden')

                const quantity = document.querySelector('input[name="quantity"]').value
                const variantId = document.querySelector('input[name="id"]').value
                const productType = document.querySelector('[name="product_type"]')?.value
                const defaultShippingAddress = document.querySelector('[name="properties[_shipping_address]"]')?.value
                const editorItemKey = sessionStorage.getItem('editor_item_key')
                const editorState = sessionStorage.getItem('editor_state')
                const editorProperties = JSON.parse(sessionStorage.getItem('editor_properties')) || {}

                if (document.querySelector('[name="properties[_json_editor_state]"]')?.value) {
                    editorProperties._json_editor_state = document.querySelector('[name="properties[_json_editor_state]"]')?.value 
                    editorProperties._production_pdf = document.querySelector('[name="properties[_production_pdf]"]')?.value 
                    editorProperties._user_pdf = document.querySelector('[name="properties[_user_pdf]"]')?.value 
                }

                if (!editorProperties._shipping_id && defaultShippingAddress.length > 0) {
                    let defaultShipping = await this.getDefaultDelivery()
                    if (defaultShipping?.length > 0 && defaultShipping[0]?.delivery_options?.length > 0) {
                        const deliveryFrom = new Date(defaultShipping[0].delivery_options[0].deliverFrom)
                        const deliveryTo = new Date(defaultShipping[0].delivery_options[0].deliverTo)

                        editorProperties._shipping_id = defaultShipping[0].delivery_options[0].delivery_id
                        editorProperties._shipping_name = defaultShipping[0].delivery_options[0].delivery_name
                        if (defaultShipping[0].delivery_options[0].deliverFrom !== defaultShipping[0].delivery_options[0].deliverTo) {
                            editorProperties['Delivery from'] = `${deliveryFrom.getDate()}/${deliveryFrom.getMonth() + 1}/${deliveryFrom.getFullYear()}`
                        }
                        editorProperties['Delivery from'] = `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`
                    }
                }

                if(editorItemKey) {
                    const itemKey = editorItemKey.split(':')
                    if(variantId === itemKey[0]) {
                        await this.saveItemChange(quantity, editorItemKey, editorProperties)
                    } else {
                        await this.removeItem(editorItemKey)
                        await this.addNewItem(quantity, variantId, editorProperties)
                    }
                    sessionStorage.removeItem("editor_item_key");
                    sessionStorage.removeItem("editor_variant_id");
                    sessionStorage.removeItem('editor_state')
                    sessionStorage.removeItem('editor_properties')
                    sessionStorage.removeItem('editor_quantity')
                } else {
                    await this.addNewItem(quantity, variantId, editorProperties)
                }

                window.location = window.routes.cart_url
            }

            onSubmitHandler(evt) {
                evt.preventDefault()
                this.submitButton.classList.add('loading')
                this.querySelector('.loading-overlay__spinner').classList.remove('hidden')
                if (this.unsubscribe) this.unsubscribe.unsubscribe('CARD_GENERATED')

                this.unsubscribe = window.eventBus.subscribe('CARD_GENERATED', data => {
                    this.addToCart(evt)
                })

                const variantId = this.form.querySelector('input[name="id"]').value

                window.eventBus.publish('GENERATE_CARD', { variantId, wait_for: false })
            }

            handleErrorMessage(errorMessage = false) {
                this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper')
                if (!this.errorMessageWrapper) return
                this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message')

                this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage)

                if (errorMessage) {
                    this.errorMessage.textContent = errorMessage
                }
            }
        }
    )
}
