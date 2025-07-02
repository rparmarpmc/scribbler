

const countryToCode = countryName => {
    let countryCodesMap = new Map()
    countryCodesMap.set('United Kingdom', 'GB')
    countryCodesMap.set('United States', 'US')
    countryCodesMap.set('Afghanistan', 'AF')
    countryCodesMap.set('Albania', 'AL')
    countryCodesMap.set('Algeria', 'DZ')
    countryCodesMap.set('American Samoa', 'AS')
    countryCodesMap.set('Andorra', 'AD')
    countryCodesMap.set('Angola', 'AO')
    countryCodesMap.set('Anguilla', 'AI')
    countryCodesMap.set('Antarctica', 'AQ')
    countryCodesMap.set('Antigua and Barbuda', 'AG')
    countryCodesMap.set('Argentina', 'AR')
    countryCodesMap.set('Armenia', 'AM')
    countryCodesMap.set('Aruba', 'AW')
    countryCodesMap.set('Australia', 'AU')
    countryCodesMap.set('Austria', 'AT')
    countryCodesMap.set('Azerbaijan', 'AZ')
    countryCodesMap.set('Bahamas', 'BS')
    countryCodesMap.set('Bahrain', 'BH')
    countryCodesMap.set('Bangladesh', 'BD')
    countryCodesMap.set('Barbados', 'BB')
    countryCodesMap.set('Belarus', 'BY')
    countryCodesMap.set('Belgium', 'BE')
    countryCodesMap.set('Belize', 'BZ')
    countryCodesMap.set('Benin', 'BJ')
    countryCodesMap.set('Bermuda', 'BM')
    countryCodesMap.set('Bhutan', 'BT')
    countryCodesMap.set('Bolivia, Plurinational State Of', 'BO')
    countryCodesMap.set('Bosnia and Herzegovina', 'BA')
    countryCodesMap.set('Botswana', 'BW')
    countryCodesMap.set('Bouvet Island', 'BV')
    countryCodesMap.set('Brazil', 'BR')
    countryCodesMap.set('British Indian Ocean Territory', 'IO')
    countryCodesMap.set('Brunei Darussalam', 'BN')
    countryCodesMap.set('Bulgaria', 'BG')
    countryCodesMap.set('Burkina Faso', 'BF')
    countryCodesMap.set('Burundi', 'BI')
    countryCodesMap.set('Cambodia', 'KH')
    countryCodesMap.set('Cameroon', 'CM')
    countryCodesMap.set('Canada', 'CA')
    countryCodesMap.set('Cape Verde', 'CV')
    countryCodesMap.set('Cayman Islands', 'KY')
    countryCodesMap.set('Central African Republic', 'CF')
    countryCodesMap.set('Chad', 'TD')
    countryCodesMap.set('Chile', 'CL')
    countryCodesMap.set('China', 'CN')
    countryCodesMap.set('Christmas Island', 'CX')
    countryCodesMap.set('Cocos (Keeling) Islands', 'CC')
    countryCodesMap.set('Colombia', 'CO')
    countryCodesMap.set('Comoros', 'KM')
    countryCodesMap.set('Congo', 'CG')
    countryCodesMap.set('Congo, The Democratic Republic of The', 'CD')
    countryCodesMap.set('Cook Islands', 'CK')
    countryCodesMap.set('Costa Rica', 'CR')
    countryCodesMap.set('Côte D&apos;Ivoire', 'CI')
    countryCodesMap.set('Croatia', 'HR')
    countryCodesMap.set('Cuba', 'CU')
    countryCodesMap.set('Cyprus', 'CY')
    countryCodesMap.set('Czech Republic', 'CZ')
    countryCodesMap.set('Denmark', 'DK')
    countryCodesMap.set('Djibouti', 'DJ')
    countryCodesMap.set('Dominica', 'DM')
    countryCodesMap.set('Dominican Republic', 'DO')
    countryCodesMap.set('Ecuador', 'EC')
    countryCodesMap.set('Egypt', 'EG')
    countryCodesMap.set('El Salvador', 'SV')
    countryCodesMap.set('Equatorial Guinea', 'GQ')
    countryCodesMap.set('Eritrea', 'ER')
    countryCodesMap.set('Estonia', 'EE')
    countryCodesMap.set('Ethiopia', 'ET')
    countryCodesMap.set('Falkland Islands (MALVINAS)', 'FK')
    countryCodesMap.set('Faroe Islands', 'FO')
    countryCodesMap.set('Fiji', 'FJ')
    countryCodesMap.set('Finland', 'FI')
    countryCodesMap.set('France', 'FR')
    countryCodesMap.set('French Guiana', 'GF')
    countryCodesMap.set('French Polynesia', 'PF')
    countryCodesMap.set('French Southern Territories', 'TF')
    countryCodesMap.set('Gabon', 'GA')
    countryCodesMap.set('Gambia', 'GM')
    countryCodesMap.set('Georgia', 'GE')
    countryCodesMap.set('Germany', 'DE')
    countryCodesMap.set('Ghana', 'GH')
    countryCodesMap.set('Gibraltar', 'GI')
    countryCodesMap.set('Greece', 'GR')
    countryCodesMap.set('Greenland', 'GL')
    countryCodesMap.set('Grenada', 'GD')
    countryCodesMap.set('Guadeloupe', 'GP')
    countryCodesMap.set('Guam', 'GU')
    countryCodesMap.set('Guatemala', 'GT')
    countryCodesMap.set('Guernsey', 'GG')
    countryCodesMap.set('Guinea', 'GN')
    countryCodesMap.set('Guinea-Bissau', 'GW')
    countryCodesMap.set('Guyana', 'GY')
    countryCodesMap.set('Haiti', 'HT')
    countryCodesMap.set('Heard Island And McDonald Islands', 'HM')
    countryCodesMap.set('Holy See (Vatican City State)', 'VA')
    countryCodesMap.set('Honduras', 'HN')
    countryCodesMap.set('Hong Kong', 'HK')
    countryCodesMap.set('Hungary', 'HU')
    countryCodesMap.set('Iceland', 'IS')
    countryCodesMap.set('India', 'IN')
    countryCodesMap.set('Indonesia', 'ID')
    countryCodesMap.set('Iran, Islamic Republic Of', 'IR')
    countryCodesMap.set('Iraq', 'IQ')
    countryCodesMap.set('Ireland', 'IE')
    countryCodesMap.set('Isle Of Man', 'IM')
    countryCodesMap.set('Israel', 'IL')
    countryCodesMap.set('Italy', 'IT')
    countryCodesMap.set('Jamaica', 'JM')
    countryCodesMap.set('Japan', 'JP')
    countryCodesMap.set('Jersey', 'JE')
    countryCodesMap.set('Jordan', 'JO')
    countryCodesMap.set('Kazakhstan', 'KZ')
    countryCodesMap.set('Kenya', 'KE')
    countryCodesMap.set('Kiribati', 'KI')
    countryCodesMap.set('Korea, Democratic People&apos;s Republic of', 'KP')
    countryCodesMap.set('Korea, Republic of', 'KR')
    countryCodesMap.set('Kuwait', 'KW')
    countryCodesMap.set('Kyrgyzstan', 'KG')
    countryCodesMap.set('Lao People&apos;s Democratic Republic', 'LA')
    countryCodesMap.set('Latvia', 'LV')
    countryCodesMap.set('Lebanon', 'LB')
    countryCodesMap.set('Lesotho', 'LS')
    countryCodesMap.set('Liberia', 'LR')
    countryCodesMap.set('Libyan Arab Jamahiriya', 'LY')
    countryCodesMap.set('Liechtenstein', 'LI')
    countryCodesMap.set('Lithuania', 'LT')
    countryCodesMap.set('Luxembourg', 'LU')
    countryCodesMap.set('Macao', 'MO')
    countryCodesMap.set('Macedonia, The Former Yugoslav Republic Of', 'MK')
    countryCodesMap.set('Madagascar', 'MG')
    countryCodesMap.set('Malawi', 'MW')
    countryCodesMap.set('Malaysia', 'MY')
    countryCodesMap.set('Maldives', 'MV')
    countryCodesMap.set('Mali', 'ML')
    countryCodesMap.set('Malta', 'MT')
    countryCodesMap.set('Marshall Islands', 'MH')
    countryCodesMap.set('Martinique', 'MQ')
    countryCodesMap.set('Mauritania', 'MR')
    countryCodesMap.set('Mauritius', 'MU')
    countryCodesMap.set('Mayotte', 'YT')
    countryCodesMap.set('Mexico', 'MX')
    countryCodesMap.set('Micronesia, Federated States of', 'FM')
    countryCodesMap.set('Moldova, Republic of', 'MD')
    countryCodesMap.set('Monaco', 'MC')
    countryCodesMap.set('Mongolia', 'MN')
    countryCodesMap.set('Montenegro', 'ME')
    countryCodesMap.set('Montserrat', 'MS')
    countryCodesMap.set('Morocco', 'MA')
    countryCodesMap.set('Mozambique', 'MZ')
    countryCodesMap.set('Myanmar', 'MM')
    countryCodesMap.set('Namibia', 'NA')
    countryCodesMap.set('Nauru', 'NR')
    countryCodesMap.set('Nepal', 'NP')
    countryCodesMap.set('Netherlands', 'NL')
    countryCodesMap.set('Netherlands Antilles', 'AN')
    countryCodesMap.set('New Caledonia', 'NC')
    countryCodesMap.set('New Zealand', 'NZ')
    countryCodesMap.set('Nicaragua', 'NI')
    countryCodesMap.set('Niger', 'NE')
    countryCodesMap.set('Nigeria', 'NG')
    countryCodesMap.set('Niue', 'NU')
    countryCodesMap.set('Norfolk Island', 'NF')
    countryCodesMap.set('Northern Mariana Islands', 'MP')
    countryCodesMap.set('Norway', 'NO')
    countryCodesMap.set('Oman', 'OM')
    countryCodesMap.set('Pakistan', 'PK')
    countryCodesMap.set('Palau', 'PW')
    countryCodesMap.set('Palestinian Territory, Occupied', 'PS')
    countryCodesMap.set('Panama', 'PA')
    countryCodesMap.set('Papua New Guinea', 'PG')
    countryCodesMap.set('Paraguay', 'PY')
    countryCodesMap.set('Peru', 'PE')
    countryCodesMap.set('Philippines', 'PH')
    countryCodesMap.set('Pitcairn', 'PN')
    countryCodesMap.set('Poland', 'PL')
    countryCodesMap.set('Portugal', 'PT')
    countryCodesMap.set('Puerto Rico', 'PR')
    countryCodesMap.set('Qatar', 'QA')
    countryCodesMap.set('Réunion', 'RE')
    countryCodesMap.set('Romania', 'RO')
    countryCodesMap.set('Russian Federation', 'RU')
    countryCodesMap.set('Rwanda', 'RW')
    countryCodesMap.set('Saint Barthélemy', 'BL')
    countryCodesMap.set('Saint Helena', 'SH')
    countryCodesMap.set('Saint Kitts and Nevis', 'KN')
    countryCodesMap.set('Saint Lucia', 'LC')
    countryCodesMap.set('Saint Martin', 'MF')
    countryCodesMap.set('Saint Pierre And Miquelon', 'PM')
    countryCodesMap.set('Saint Vincent and the Grenadines', 'VC')
    countryCodesMap.set('Samoa', 'WS')
    countryCodesMap.set('San Marino', 'SM')
    countryCodesMap.set('Sao Tome and Principe', 'ST')
    countryCodesMap.set('Saudi Arabia', 'SA')
    countryCodesMap.set('Senegal', 'SN')
    countryCodesMap.set('Serbia', 'RS')
    countryCodesMap.set('Seychelles', 'SC')
    countryCodesMap.set('Sierra Leone', 'SL')
    countryCodesMap.set('Singapore', 'SG')
    countryCodesMap.set('Slovakia', 'SK')
    countryCodesMap.set('Slovenia', 'SI')
    countryCodesMap.set('Solomon Islands', 'SB')
    countryCodesMap.set('Somalia', 'SO')
    countryCodesMap.set('South Africa', 'ZA')
    countryCodesMap.set('South Georgia And The South Sandwich Islands', 'GS')
    countryCodesMap.set('Spain', 'ES')
    countryCodesMap.set('Sri Lanka', 'LK')
    countryCodesMap.set('Sudan', 'SD')
    countryCodesMap.set('Suriname', 'SR')
    countryCodesMap.set('Svalbard And Jan Mayen', 'SJ')
    countryCodesMap.set('Swaziland', 'SZ')
    countryCodesMap.set('Sweden', 'SE')
    countryCodesMap.set('Switzerland', 'CH')
    countryCodesMap.set('Syrian Arab Republic', 'SY')
    countryCodesMap.set('Taiwan, Province Of China', 'TW')
    countryCodesMap.set('Tajikistan', 'TJ')
    countryCodesMap.set('Tanzania, United Republic Of', 'TZ')
    countryCodesMap.set('Thailand', 'TH')
    countryCodesMap.set('Timor-Leste', 'TL')
    countryCodesMap.set('Togo', 'TG')
    countryCodesMap.set('Tokelau', 'TK')
    countryCodesMap.set('Tonga', 'TO')
    countryCodesMap.set('Trinidad and Tobago', 'TT')
    countryCodesMap.set('Tunisia', 'TN')
    countryCodesMap.set('Turkey', 'TR')
    countryCodesMap.set('Turkmenistan', 'TM')
    countryCodesMap.set('Turks and Caicos Islands', 'TC')
    countryCodesMap.set('Tuvalu', 'TV')
    countryCodesMap.set('Uganda', 'UG')
    countryCodesMap.set('Ukraine', 'UA')
    countryCodesMap.set('United Arab Emirates', 'AE')
    countryCodesMap.set('United States Minor Outlying Islands', 'UM')
    countryCodesMap.set('Uruguay', 'UY')
    countryCodesMap.set('Uzbekistan', 'UZ')
    countryCodesMap.set('Vanuatu', 'VU')
    countryCodesMap.set('Venezuela, Bolivarian Republic Of', 'VE')
    countryCodesMap.set('Vietnam', 'VN')
    countryCodesMap.set('Virgin Islands, British', 'VG')
    countryCodesMap.set('Virgin Islands, U.S.', 'VI')
    countryCodesMap.set('Wallis and Futuna', 'WF')
    countryCodesMap.set('Western Sahara', 'EH')
    countryCodesMap.set('Yemen', 'YE')
    countryCodesMap.set('Zambia', 'ZM')
    countryCodesMap.set('Zimbabwe', 'ZW')

    return countryCodesMap.get(countryName) || 'GB'
}


function addFavourite(_this, id) {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: `application/json`
        },
        body: JSON.stringify({
            shoppify_product_id: id
        })
    }

 
    _this.children[0].classList.add('loading')

    _this.children[1].children[1].style.fill = 'none'

    _this.children[1].children[1].style.stroke = '#cbd81d'

    


    fetch(`/apps/scribblerApi/v1/shoppify/private/favourite`, config)
        .then(response => response.json())
        .then(response => {
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (!favs.includes(id)) favs.push(id);
            localStorage.setItem('favorites', JSON.stringify(favs));
            window.eventBus.publish('FAVOURITES_ITEM', response)
        })
        .catch(e => {
            console.error(e)
        })
        .finally(() => {
            _this.children[0].classList.remove('loading')
            _this.setAttribute('favourite', 'true')
            _this.setAttribute('onclick', 'removeFavourite(this,' + id + ')')
        })
}

function removeFavourite(_this, id) {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: `application/json`
        }
    }

    _this.children[0].classList.add('loading')


    _this.children[1].children[1].style.stroke = '#6e6d6d'
   
    _this.children[1].children[1].style.fill = '#6e6d6d'
  
    fetch(`/apps/scribblerApi/v1/shoppify/private/favourite/${id}`, config)
        .then(response => response.json())
        .then(response => {
            window.eventBus.publish('FAVOURITES_ITEM', response)
            loadFavourites();
        })
        .catch(e => {
            console.error(e)
        })
        .finally(() => {
            _this.setAttribute('favourite', 'false')
            _this.children[0].classList.remove('loading')
            _this.setAttribute('onclick', 'addFavourite(this,' + id + ')')
        })
}


async function addExpirationDates(defaultShipping, formData) {
    if (defaultShipping?.length > 0 && defaultShipping[0]?.delivery_options?.length > 0) {
        const deliveryTo = new Date(defaultShipping[0].delivery_options[0].deliverTo)

        formData.append('properties[_shipping_id]', defaultShipping[0].delivery_options[0].delivery_id)
        formData.append('properties[_shipping_name]', defaultShipping[0].delivery_options[0].delivery_name)
        if (defaultShipping[0].delivery_options[0].deliverFrom !== defaultShipping[0].delivery_options[0].deliverTo) {
            const deliveryFrom = new Date(defaultShipping[0].delivery_options[0].deliverFrom)
 
            formData.append('properties[Delivery from]', ('0' + deliveryFrom.getDate()).slice(-2) + '/'
             + ('0' + (deliveryFrom.getMonth()+1)).slice(-2) + '/'
             + deliveryFrom.getFullYear())
        }
        formData.append('properties[Delivery to]', ('0' + deliveryTo.getDate()).slice(-2) + '/'
             + ('0' + (deliveryTo.getMonth()+1)).slice(-2) + '/'
             + deliveryTo.getFullYear())
    }
}

async function addToBasket(_this, id, productType, variantTitle) {
    _this.children[0].classList.add('loading')

    if (_this.getElementsByClassName('cart-error').length > 0) {
        var errorNotice = _this.getElementsByClassName('cart-error')
        _this.removeChild(errorNotice[0])
    }

    var config = fetchConfig('javascript')
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    delete config.headers['Content-Type']

    var formData = new FormData()
    formData.append('id', id)
    formData.append('sections', ['cart-icon-bubble'])
    formData.append('sections_url', window.location.pathname)

    async function getDefaultDelivery() {
        var defaultAddress = document.querySelector('[name="default_shipping_address"]')?.value
        if (defaultAddress?.length > 0) {
            formData.append('properties[_shipping_address]', defaultAddress)
            const address = JSON.parse(defaultAddress)

            formData.append(
                'properties[Shipping address]',
                `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2 ? address.address2 + ',' : ''} ${address.city}, ${address.province ? address.province + ',' : ''} ${address.country}, ${address.zip}, ${
                    address.phone ? address.phone + ',' : ''
                } ${address.addressType}`
            )

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

    await addExpirationDates(defaultShipping, formData)

    config.body = formData

    fetch(`${routes.cart_add_url}`, config)
        .then(response => response.json())
        .then(response => {
            if (response.status) {
                var errorContainer = document.createElement('div')
                errorContainer.classList.add('cart-error')
                var text = document.createTextNode(response.description)
                errorContainer.appendChild(text)
                _this.appendChild(errorContainer)
            } else if (response.sections['cart-icon-bubble']) {

                console.log(response)
                document.getElementById('cart-icon-bubble').innerHTML = response.sections['cart-icon-bubble'].replace('class=\"shopify-section\"', '')
                this.stickyHeader = document.querySelector('sticky-header')
                this.stickyHeader.reveal()
                document.getElementById('added-to-basket-info').classList.add('open')
                setTimeout(() => {
                    document.getElementById('added-to-basket-info').classList.remove('open')
                }, 6000)
            }
        })
        .catch(e => {
            console.error(e)
        })
        .finally(() => {
            _this.children[0].classList.remove('loading')
        })
}

function generateFavIconHTML(isLoggedIn, product) {
    var button = ''
    if (product.products[0].is_user_favorite) {
        button = `<button type="button" name="Add to Favourites" favourite="true" onclick="removeFavourite(this,${product.products[0].id})" class="add-to-favourites-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#cbd81d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`
    } else {
        button = `<button type="button" name="Add to Favourites" favourite="false" onclick="addFavourite(this,${product.products[0].id})" class="add-to-favourites-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`
    }


    return isLoggedIn
        ? button
        : `<button type="button" aria-label="Add to Favourites" name="Add to Favourites" class="add-to-favourites-button" onclick="window.location='/account/login'">  
                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`
}

function generateAddToCartHTML(product) {

    return `<button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${product.products[0].variants[0].id}, '${product.products[0].product_type}', '${product.products[0].variants[0].title}')" class="add-to-basket-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.9143 34.5332C27.2635 34.5332 34.8425 26.9542 34.8425 17.605C34.8425 8.25577 27.2635 0.676758 17.9143 0.676758C8.5651 0.676758 0.986084 8.25577 0.986084 17.605C0.986084 26.9542 8.5651 34.5332 17.9143 34.5332Z" fill="#E6E6E6"/>
                    <path d="M27.8029 11.7388C28.641 11.7388 29.2276 12.4092 29.1438 13.2472L26.9649 23.8064C26.7973 25.3987 25.7079 26.6557 24.367 26.6557H11.4614C10.1205 26.6557 9.03108 25.4825 8.86347 23.8064L6.68459 13.2472C6.60079 12.4092 7.27121 11.7388 8.02544 11.7388H27.8029Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.8916 11.2357C13.8916 7.71599 17.9141 7.88359 17.9141 7.88359C17.9141 7.88359 21.9367 7.71599 21.9367 11.2357" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.77393 16.5991H28.2219" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M8.86353 21.6274H26.965" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M13.9753 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M21.9368 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                </svg>
            </button>`
}

// coverts and format currency in full number 1420 not 14,20
function convertGiftPriceAndFormatCurrency(price) {
    return Intl.NumberFormat(window.Shopify.currency.countryCode, { style: 'currency', currency: window.Shopify.currency.active }).format(price * window.Shopify.currency.rate)
}

function generatePrice(product) {
    if (product.products[0].variants[0].compare_at_price && product.products[0].variants[0].compare_at_price !== '0.00') {
        return `<div class="collection-gift-slider-price">
            <p class="compare-price">${convertGiftPriceAndFormatCurrency(product.products[0].variants[0].compare_at_price).replace('.00', '')}</p>
            <p class="compare-actual-price">${convertGiftPriceAndFormatCurrency(product.products[0].variants[0].price).replace('.00', '')}</p>
        </div>`
    } else {
        return `<div class="collection-gift-slider-price">${convertGiftPriceAndFormatCurrency(product.products[0].variants[0].price).replace('.00', '')}</div>`
    }
}

function generateImage(product) {

    if (product.products[0].image.src) {
        return `<a href="/products/${product.products[0].handle}">
                    <img src="${product.products[0].image.src}${product.products[0].image.src.includes('shopify') ? '&width=309' : ''}"
                        alt="${product.products[0].image.alt ? product.products[0].image.alt : product.products[0].title}"
                        width="309"
                        decoding="async"
                        height="430" />
                </a>`
    } else {
        return `<a href="/products/${product.products[0].handle}"></a>`
    }
}

function generateCardAction(product, params) {
    return `<div class="card-actions">
                <div class="card-actions-favourites">${generateFavIconHTML(params.isLoggedIn, product)}</div>
                    <div class="card-actions-vendor-logo">
                        <a href="/collections/vendors?q=${encodeURIComponent(product.products[0].vendor)}">
                            <img src="${product.products[0].vendor_image_path !== '' ? product.products[0].vendor_image_path : params.default_vendor_logo}" alt="${product.products[0].vendor}" width="60" height="60" decoding="async" />
                        </a>
                    </div>
                <div class="card-actions-buy">${generateAddToCartHTML(product)}</div>
            </div>`
}

function generateGiftAction(product, params) {
    return `<div class="gift-actions">
                <div class="gift-actions-favourites">${generateFavIconHTML(params.isLoggedIn, product)}</div>
                <div class="gift-actions-name">
                    <span style="display: -webkit-box; -webkit-box-orient: vertical; line-clamp: 2; -webkit-line-clamp: 2;">${product.products[0].title}</span>
                </div>
                ${params.type === 'gift' ? generatePrice(product) : ''}
                <button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${product.products[0].variants[0].id}, '${product.products[0].product_type}', '${product.products[0].variants[0].title}')" class="gift-actions-buy">
                    Add Gift
                    <div class="product-add-loader"></div>
                </button>
            </div>`
}

function createCardSlide(products, params) {
    
    return new Promise(async (resolve, reject) => {
        const productIds = products.map(product => {
            const gid = product.id;

            // Check if the ID is in the Shopify GID format
            if (typeof gid === 'string' && gid.startsWith('gid://')) {
                return gid.split('/').pop(); // extract numeric ID from GID
            }
        
            return gid; // return as-is if it's not a GID
        });

        const fetchProductData = (numericId) => {
            return fetch(`/apps/scribblerApi/v1/shoppify/public/products/${numericId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Error fetching data for product ID ${numericId}:`, error);
                return null; // Return null in case of error
            });
        };

        try {
            // Fetch data for all products concurrently
            const productDataPromises = productIds.map(id => fetchProductData(id));
            const productsData = await Promise.all(productDataPromises);

            // Filter out any null values (in case of failed fetches)
            const validProductsData = productsData.filter(data => data !== null);

            const productHtml = validProductsData
                .map(product => {
                    return `<div class="collection-slider-item">
                        <div class="collection-slider-item-product">
                            ${generateImage(product)}
                            ${params.type === 'card' ? generateCardAction(product, params) : generateGiftAction(product, params)}
                        </div>
                    </div>`;
                })
                .join('');

            resolve(productHtml); // Resolve with the generated HTML
        } catch (error) {
            console.error('Error fetching product data:', error);
            reject(error); // Reject in case of error
        }
    });
}


async function getFilteredProducts(params) {
    const query = `
        query {
            collections(first: 1, query: "title:${params.collection_title}") {
                edges {
                    node {
                        id
                        handle
                    }
                }
            }
        }
    `;


    try {
        var response = await fetch('/admin/api/2024-07/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': params.shopify_token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
        });

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const data = await response.json();
        const collectionId = data.data.collections.edges[0].node.id;


        if(params.sort_order == "manual"){
            params.sort_order = "MANUAL"
        }else if (params.sort_order == "best-selling"){
            params.sort_order = "BEST_SELLING"
        }else if (params.sort_order == "created-descending"){
            params.sort_order = "CREATED reverse: true"
        }else if (params.sort_order == "random"){
            params.sort_order = "MANUAL"
        }else if (params.sort_order == "price-descending"){
            params.sort_order = "PRICE reverse: true"
        }else if (params.sort_order == "price-ascending"){
            params.sort_order = "PRICE"
        }else if (params.sort_order == "created-ascending"){
            params.sort_order = "CREATED"
        }else if (params.sort_order == "manual-best-selling"){
            params.sort_order = "MANUAL"
        }

        const query1 = `
            query {
            collection(id: "${collectionId}") {
                    products(first: ${params.limit}, sortKey: ${params.sort_order}) {
                         edges {
                            node {
                                id
                                title
                                handle
                                description
                                vendor
                                productType
                                tags
                                featuredImage {
                                    url
                                    id
                                    altText
                                }
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 1){
                                    edges{
                                        node{
                                            id
                                            title
                                            sku
                                            compareAtPrice
                                            price
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;


        try {
            var response1 = await fetch('/admin/api/2024-07/graphql.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': params.shopify_token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: query1
                })
            });

            if (!response1.ok) {
                throw new Error('HTTP status ' + response1.status);
            }

            const data1 = await response1.json();
          
   
            return data1;
            
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }

    } catch (error) {
        console.error('Error fetching collection:', error);
        throw error;
    }
}

async function getRelatedProducts(params) {
    var response = await fetch(`/apps/scribblerApi/v1/shoppify/public/products/recommended`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: `application/json` },
        body: JSON.stringify({
            vendor_name: params.vendor_name,
            product_type: params.product_type, // return product from type card or gift
            rude: true,
            limit: params.limit,
            tags: params.tags
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
        } else {
            return response.json()
        }
    })

    return response
}

function createCardRecommendationSlide(products, params) {
    var productHtml = products
        .map(product => {
            let productImageHtml = '';
            if (product?.image?.src) {
                productImageHtml = `<a href="/products/${product?.handle}">
                                        <img src="${product?.image?.src}${product?.image?.src.includes('shopify') ? '&width=309' : ''}"
                                            alt="${product?.image?.alt ? product.image.alt : product?.title}"
                                            width="309"
                                            decoding="async"
                                            height="430" />
                                    </a>`;
            } else {
                productImageHtml = `<a href="/products/${product?.handle}"></a>`;
            }

            let favIconHtml = '';
            if (product?.is_user_favorite) {
                favIconHtml = `<button type="button" name="Add to Favourites" favourite="true" onclick="removeFavourite(this,${product.id})" class="add-to-favourites-button">
                                <div class="product-add-loader"></div>
                                <svg width="35" height="33" viewBox="0 0 35 33" fill="#cbd81d" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#cbd81d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>`;
            } else {
                favIconHtml = `<button type="button" name="Add to Favourites" favourite="false" onclick="addFavourite(this,${product.id})" class="add-to-favourites-button">
                                <div class="product-add-loader"></div>
                                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="none"/>
                                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>`;
            }

            let addToCartHtml = `<button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${product?.variants[0]?.id}, '${product?.product_type}', '${product?.variants[0]?.title}')" class="add-to-basket-button">
                                    <div class="product-add-loader"></div>
                                    <svg width="35" height="35" viewBox="0 0 35 35" fill="#6e6d6d" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.9" d="M17.9143 34.5332C27.2635 34.5332 34.8425 26.9542 34.8425 17.605C34.8425 8.25577 27.2635 0.676758 17.9143 0.676758C8.5651 0.676758 0.986084 8.25577 0.986084 17.605C0.986084 26.9542 8.5651 34.5332 17.9143 34.5332Z" fill="#E6E6E6"/>
                                        <path d="M27.8029 11.7388C28.641 11.7388 29.2276 12.4092 29.1438 13.2472L26.9649 23.8064C26.7973 25.3987 25.7079 26.6557 24.367 26.6557H11.4614C10.1205 26.6557 9.03108 25.4825 8.86347 23.8064L6.68459 13.2472C6.60079 12.4092 7.27121 11.7388 8.02544 11.7388H27.8029Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13.8916 11.2357C13.8916 7.71599 17.9141 7.88359 17.9141 7.88359C17.9141 7.88359 21.9367 7.71599 21.9367 11.2357" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.77393 16.5991H28.2219" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M8.86353 21.6274H26.965" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M13.9753 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M21.9368 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                    </svg>
                                </button>`;

            let priceHtml = '';
            
                if (product?.variants[0]?.compare_at_price && product?.variants[0]?.compare_at_price !== '0.00') {
                    priceHtml = `<div class="collection-gift-slider-price">
                                    <p class="compare-price">${convertGiftPriceAndFormatCurrency(product?.variants[0]?.compare_at_price).replace('.00', '')}</p>
                                    <p class="compare-actual-price">${convertGiftPriceAndFormatCurrency(product.variants[0].price).replace('.00', '')}</p>
                                </div>`;
                } else {
                    priceHtml = `<div class="collection-gift-slider-price">${convertGiftPriceAndFormatCurrency(product.variants[0].price).replace('.00', '')}</div>`;
                }
    
                let actionsHtml = '';
                if (params.type === 'card') {
                    actionsHtml = `<div class="card-actions">
                                    <div class="card-actions-favourites">${params.isLoggedIn ? favIconHtml : `<button type="button" aria-label="Add to Favourites" name="Add to Favourites" class="add-to-favourites-disabled">  
                                        <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                                            <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>`}</div>
                                    <div class="card-actions-vendor-logo">
                                        <a href="/collections/vendors?q=${encodeURIComponent(product?.vendor)}">
                                            <img src="${product?.vendor_image_path !== '' ? product?.vendor_image_path : params.default_vendor_logo}" alt="${product?.vendor}" width="60" height="60" decoding="async" />
                                        </a>
                                    </div>
                                    <div class="card-actions-buy">${addToCartHtml}</div>
                                </div>`;
                } else if (params.type === 'gift') {
                    actionsHtml = `<div class="gift-actions">
                                    <div class="gift-actions-name">
                                        <span style="display: -webkit-box; -webkit-box-orient: vertical; line-clamp: 2; -webkit-line-clamp: 2;">${product?.title}</span>
                                    </div>
                                    ${priceHtml}
                                    <button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${product?.variants[0]?.id}, '${product?.product_type}', '${product?.variants[0]?.title}')" class="gift-actions-buy">
                                        Add Gift
                                        <div class="product-add-loader"></div>
                                    </button>
                                </div>`;
                }
    
                return `<div class="collection-slider-item">
                        <div class="collection-slider-item-product">
                            ${productImageHtml}
                            ${actionsHtml}
                        </div>
                    </div>`;
            })
            .join('');
    
        return productHtml;
}