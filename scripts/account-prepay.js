// coverts and format currency in full number 1420 not 14,20
const convertFormatCurrency = price => {
    return Intl.NumberFormat(window.Shopify.currency.countryCode, { style: 'currency', currency: window.Shopify.currency.active }).format((price * window.Shopify.currency.rate) / 100)
}

fetch('/apps/scribblerApi/v1/shoppify/private/user/detail', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(response => {
        if (response.prepay_credit_balance) {
            document.getElementById('prepay-balance').innerHTML = convertFormatCurrency(response.prepay_credit_balance)
        }
    })
    .catch(e => {
        console.error(e)
    })

const data = {
    collection_id: 'PrePay',
    limit: 22,
    rude: true,
    sort_order: 'best-selling'
}

fetch(`/apps/scribblerApi/v1/shoppify/public/products/filter`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: `application/json` }, body: JSON.stringify(data) })
    .then(response => response.json())
    .then(response => {
        if (response.products.length > 0) {
            generatePrepayProducts(response.products)
        }
    })
    .catch(e => {
        console.error(e)
    })

const generatePrepayProducts = products => {
    const productContainer = document.getElementById('prepay-products')
    let productsHTML = ''

    products.map(product => {
        productsHTML += `
            <div class="prepay-product">
                <div class="prepay-product-image-wrapper">
                    <img class="prepay-product-image" src="${product?.image?.src}" alt="${product.title}" />
                    <div class="prepay-product-badge">${product.body_html}</div>
                </div>
                <button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addPrePayToBasket(this,${product?.variants[0]?.id})" class="prepay-add-to-basket">
                   Buy £${product?.variants[0]?.price} <div class="prepay-product-add-loader"></div>
                </button>
            </div>`
    })

    productContainer.innerHTML = productsHTML
}

const addPrePayToBasket = (_this, id) => {
    _this.getElementsByTagName('div')[0].style.display = 'inline-block'

    var config = fetchConfig('javascript')
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    delete config.headers['Content-Type']

    var formData = new FormData()
    formData.append('id', id)
    formData.append('sections', ['cart-icon-bubble'])
    formData.append('sections_url', window.location.pathname)

    config.body = formData

    fetch(`/cart/clear.js`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
        .then(() => {
            fetch(`${routes.cart_add_url}`, config)
                .then(response => response.json())
                .then(response => {
                    if (response.status) {
                        document.getElementById('customer-account-error').innerHTML = response.message
                        document.getElementById('customer-account-success').innerHTML = ''
                    } else if (response.sections['cart-icon-bubble']) {
                        window.eventBus.publish('UPDATE_CART_KEY', {})
                        document.getElementById('cart-icon-bubble').innerHTML = response.sections['cart-icon-bubble'].replace('class="shopify-section"', '')
                        window.location = `/checkout`
                    }
                })
                .catch(e => {
                    console.error(e)
                })
                .finally(() => {
                    _this.getElementsByTagName('div')[0].style.display = 'none'
                })
        })
        .catch(e => {
            console.error(e)
        })
}
