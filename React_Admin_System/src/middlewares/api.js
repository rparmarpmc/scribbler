// const apiEndpointDomain = window.location.origin
// const apiEndpointDomain = 'http://localhost:3001/react-admin'
// const apiEndpointDomain = 'http://127.0.0.1:9292/cart/add'

/** env API */
export const getFonts = (endpoint) => {
    const apiUrl = `${endpoint}/v2/fonts/api`

    return fetch(apiUrl, { method: 'GET', priority: 'high', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const generateImages = (endpoint, data) => {
    const apiUrl = `${endpoint}/v2/shoppify/public/card/api`

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getDeliveryOptions = (data) => {
    const apiUrl = '/apps/scribblerApi/v1/delivery-options'

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const calculateShippingTotal = (data) => {
    const apiUrl = '/apps/scribblerApi/v1/delivery-calculate-total'

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

/** domain API */

export const removeBasketItem = (key) => {
    const data = {
        id: key,
        quantity: 0,
        sections: ['cart-icon-bubble'],
        sections_url: window.location.pathname
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const removeBasketItemAndGift = (giftKey, itemKey) => {
    const data = {
        updates: {
            [`${giftKey}`]: 0,
            [`${itemKey}`]: 0
        }
    }

    return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const removeGiftFromItem = (giftKey) => {
    const data = {
        updates: {
            [`${giftKey}`]: 0
        }
    }

    return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getBasketContent = () => {
    const data = {
        sections: ['cart-icon-bubble'],
        sections_url: window.location.pathname
    }

    return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const changeBasketItemQuantity = (line, quantity) => {
    const data = {
        line,
        quantity,
        sections: ['cart-icon-bubble'],
        sections_url: window.location.pathname
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const changeBasketAddress = (quantity, line, properties) => {
    if (Object.entries(properties).length === 0) {
        properties = { _empty: true }
    }
    if (Object.entries(properties).length > 1) {
        delete properties._empty
    }

    const data = {
        line,
        quantity,
        properties
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const updateGiftReference = (randomInt, orginalProduct, line) => {
    const data = {
        line,
        quantity: orginalProduct.quantity,
        properties: {
            ...orginalProduct.properties,
            _connected_gift_id: randomInt
        }
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addGiftProduct = (randomInt, variantId, _shipping_id, _shipping_name, delideryFrom, deliveryTo, _shipping_address) => {
    let data = {}

    if (_shipping_id) {
        const address = JSON.parse(_shipping_address)
        data = {
            id: variantId,
            quantity: 1,
            properties: {
                _gift_line: randomInt,
                _shipping_id,
                _shipping_name,
                'Delivery to': deliveryTo,
                _shipping_address,
                'Shipping address': `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${
                    address.zip
                }, ${address.phone ? address.phone + ',' : ''} ${address.addressType}`
            }
        }
        if (delideryFrom !== deliveryTo) {
            data['properties']['Delivery from'] = delideryFrom
        }
    } else {
        data = {
            id: variantId,
            quantity: 1,
            properties: {
                _gift_line: randomInt,
                _shipping_address
            }
        }
    }

    return fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addShippingOption = (line, properties, quantity) => {
    const data = {
        line,
        quantity,
        properties
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const updateItemsProperties = (quantity, key, properties) => {
    const data = {
        id: key,
        quantity: quantity,
        properties: properties
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const updateSendOnDate = (properties, line, sendOnDate) => {
    const data = {
        line,
        properties: {
            ...properties,
            'Send On Date': sendOnDate
        }
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

/** PROXY API */
export const getAddresses = () => {
    let apiUrl = '/apps/scribblerApi/v1/shoppify/private/addresses'

    return fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addAddress = (data) => {
    const apiUrl = '/apps/scribblerApi/v1/shoppify/private/addresses'

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const removeAddress = (id) => {
    const apiUrl = `/apps/scribblerApi/v1/shoppify/private/addresses/${id}`

    return fetch(apiUrl, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getGiftProductsFromCollection = (id) => {
    const apiUrl = `/apps/scribblerApi/v1/shoppify/public/products/${id}/gifts`

    return fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addDiscount = (discount_code, token) => {
    const apiUrl = '/apps/scribblerApi/v1/shoppify/private/cart/apply_discount'

    const data = {
        discount_code,
        token
    }

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getAutocompleteSuggestions = (term, country, apiKey) => {
    return fetch('https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            Key: apiKey,
            Text: term,
            IsMiddleware: 'off', // to use calling ip for address sugestion
            Origin: country,
            Limit: 7,
            Language: 'en'
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getAutocompleteAddressDetails = (id, apiKey) => {
    return fetch('https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            Key: apiKey,
            Id: id
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const getAutocomplettePostcodeDetails = (term, country, id, apiKey) => {
    //services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?
    // Key=XD49-AJ91-DZ98-AN72
    // &Text=NE7%207NN
    // &Container=GB%7CRM%7CENG%7C7NN-NE7
    // &Origin=GBR
    // &Countries=
    // &Datasets=
    // &Limit=7
    // &Filter=&
    // Language=en
    // &$block=true
    // &$cache=true
    // &SOURCE=PCA-SCRIPT
    // &SESSION=559d7606-5e08-4beb-1db9-0e1882fbd73e

    return fetch('https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            Key: apiKey,
            Text: term,
            Container: id,
            Origin: country,
            Limit: 7,
            Language: 'en'
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const login = (user, password, returnUrl) => {
    const apiUrl = '/apps/scribblerApi/v1/shoppify/private/login'

    const data = {
        email: user,
        password: password,
        page: returnUrl,
        local: window.location.origin.includes('127.0.0.1') ? true : false,
        local_domain: window.location.origin
    }

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const register = (firstName, lastName, email, password, privacy, terms, marketing) => {
    const apiUrl = '/apps/scribblerApi/v1/shoppify/private/register'

    const data = {
        email,
        firstName,
        lastName,
        marketing,
        password,
        privacy,
        terms
    }

    return fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

/* =========================== ====================*/

export const getUserDetails = () => {
    const apiUrl = '/apps/scribblerApi/v1/shoppify/private/user/detail'

    return fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const updateBasketKey = (basketKey) => {
    if (basketKey === null) return null
    const apiUrl = `/apps/scribblerApi/v1/shoppify/private/cart/register/${basketKey}`

    return fetch(apiUrl, { method: 'GET', priority: 'high', headers: { 'Content-Type': 'application/json' } })
}

export const getCartContent = () => {
    return fetch('/cart.js', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const changeCartQuantity = (itemKey, itemQuantity, giftKey, giftQuantity) => {
    let data = {}
    if (itemKey && giftKey) {
        data = {
            updates: {
                [`${giftKey}`]: itemQuantity,
                [`${itemKey}`]: giftQuantity
            }
        }
    } else if (itemKey) {
        data = {
            updates: {
                [`${itemKey}`]: itemQuantity
            }
        }
    } else if (giftKey) {
        data = {
            updates: {
                [`${giftKey}`]: giftQuantity
            }
        }
    }

    return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const saveItemChange = (quantity, key, properties) => {
    const data = {
        id: key,
        quantity: quantity,
        properties: properties
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const saveItemByVariantId = (items) => {
    const data = {
        items: []
    }

    items.map((item) => {
        data.items.push(item)
    })

    return fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const removeMultiItems = (items) => {
    let data = {
        updates: {}
    }

    items.map((item) => {
        data.updates[item.key] = 0
    })

    return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', cache: 'no-store' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const clearCart = () => {
    const data = {}

    return fetch('/cart/clear.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addGiftReferenceToCard = (key, quantity, properties) => {
    const data = {
        id: key,
        quantity: quantity,
        properties
    }

    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}

export const addItem = (item) => {
    const data = {
        items: [item]
    }

    return fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })
}
