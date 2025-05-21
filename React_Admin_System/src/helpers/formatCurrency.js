// format currency in full number 1420 not 14,20
export const formatCurrency = (price) => {
    return Intl.NumberFormat(window.Shopify.currency.countryCode, { style: 'currency', currency: window.Shopify.currency.active }).format(price / 100)
}

// coverts and format currency in full number 1420 not 14,20
export const convertFormatCurrency = (price) => {
    return Intl.NumberFormat(window.Shopify.currency.countryCode, { style: 'currency', currency: window.Shopify.currency.active }).format((price * window.Shopify.currency.rate) / 100)
}

// coverts only currency in full number 1420 not 14,20
export const convertCurrency = (price) => {
    return price * window.Shopify.currency.rate
}
