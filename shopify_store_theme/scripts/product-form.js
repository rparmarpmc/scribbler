if (!customElements.get('product-form')) {
    customElements.define('product-form', class ProductForm extends HTMLElement {
        constructor() {
            super();

            this.form = this.querySelector('form');
            this.form.querySelector('[name=id]').disabled = false;
            this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
            this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
            this.submitButton = this.querySelector('[type="submit"]');
            if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
        }

        async onSubmitHandler(evt) {
            evt.preventDefault();
            if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

            this.handleErrorMessage();

            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButton.classList.add('loading');
            this.querySelector('.loader').classList.remove('hidden');

            var config = fetchConfig('javascript');
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            delete config.headers['Content-Type'];

            var formData = new FormData(this.form);
            if (this.cart) {
                formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
                formData.append('sections_url', window.location.pathname);
                this.cart.setActiveElement(document.activeElement);
            }

            async function getDefaultDelivery() {
                var defaultAddress = document.querySelector('[name="default_shipping_address"]')?.value
                if (defaultAddress?.length > 0) {
                    const address = JSON.parse(defaultAddress)
                    formData.append(
                        'properties[Shipping address]',
                        `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${address.zip}, ${
                            address.phone ? address.phone + ',' : ''
                        } ${address.addressType}`
                    )

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
                            product_type = 1;
                            product_size  = variantTitle.includes("Standard") ? 1 : 2;
                            break;
                        case 'Gifts':
                            product_type = 2
                            break;
                        case 'Alcohol':
                            product_type = 3
                            break;
                        default:
                            product_type = 1
                            break;
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

            let defaultShipping = await getDefaultDelivery()

            if (defaultShipping?.length > 0 && defaultShipping[0]?.delivery_options?.length > 0) {
                const deliveryFrom = new Date(defaultShipping[0].delivery_options[0].deliverFrom)
                const deliveryTo = new Date(defaultShipping[0].delivery_options[0].deliverTo)

                formData.append('properties[_shipping_id]', defaultShipping[0].delivery_options[0].delivery_id)
                formData.append('properties[_shipping_name]', defaultShipping[0].delivery_options[0].delivery_name)
                if(defaultShipping[0].delivery_options[0].deliverFrom !== defaultShipping[0].delivery_options[0].deliverTo) {
                    formData.append('properties[Delivery from]', `${deliveryFrom.getDate()}/${deliveryFrom.getMonth() + 1}/${deliveryFrom.getFullYear()}`)
                }
                formData.append('properties[Delivery to]', `${deliveryTo.getDate()}/${deliveryTo.getMonth() + 1}/${deliveryTo.getFullYear()}`)
            }

            config.body = formData;

            fetch(`${routes.cart_add_url}`, config)
            .then((response) => response.json())
            .then((response) => {
                if (response.status) {
                    this.handleErrorMessage(response.description)

                    var soldOutMessage = this.submitButton.querySelector('.sold-out-message')
                    if (!soldOutMessage) return
                    this.submitButton.setAttribute('aria-disabled', true)
                    this.submitButton.querySelector('span').classList.add('hidden')
                    soldOutMessage.classList.remove('hidden')
                    this.error = true
                    return
                } else if (!this.cart) {
                    window.location = window.routes.cart_url
                    return
                } else {
                    this.stickyHeader = document.querySelector('sticky-header')
                    this.stickyHeader.reveal()
                    document.getElementById('added-to-basket-info').classList.add('open')
                    setTimeout(() => {
                        document.getElementById('added-to-basket-info').classList.remove('open')
                    }, 6000)
                }

                this.error = false;
                var quickAddModal = this.closest('quick-add-modal');
                if (quickAddModal) {
                    document.body.addEventListener('modalClosed', () => {
                        setTimeout(() => { this.cart.renderContents(response) });
                    }, { once: true });
                    quickAddModal.hide(true);
                } else {
                    this.cart.renderContents(response);
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                this.submitButton.classList.remove('loading');
                if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
                if (!this.error) this.submitButton.removeAttribute('aria-disabled');
                this.querySelector('.loader').classList.add('hidden');
            });
        }

        handleErrorMessage(errorMessage = false) {
            this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
            if (!this.errorMessageWrapper) return;
            this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

            this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

            if (errorMessage) {
            this.errorMessage.textContent = errorMessage;
            }
        }
    });
}
