let type = 'Direct'
let addressesList = []
let filter = null
// let requestURL = '/apps/scribblerApi/v1/shoppify/private/addresses/?logged_in_customer_id=5708817891535&shop=scribbler-development.myshopify.com'
// if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '') alert("It's a local server!")


fetch(`/apps/scribblerApi/v1/shoppify/private/addresses`, { method: 'GET', headers: { 'Content-Type': 'application/json', Accept: `application/json` } })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
        } else {
            return response.json()
        }
    })
    .then(response => {
        if (response.length > 0) {
            
            addressesList = response

            //clear errors
            document.getElementById('customer-account-error').innerHTML = ''

            displayResults();
            return
        } else {
            document.getElementById('customer-account-error').innerHTML = "You don't have saved addresses"
            return
        }
    })
    .catch(e => {
        document.getElementById('customer-account-error').innerHTML = e.message
    })
    .finally(() => {
    })


const showAddresses = (event, newType) => {
    type = newType
    filter = null

    if (type === 'Indirect') {
        document.getElementsByClassName('address-list-notice')[0].innerHTML = 'BTM or Back To Me are your addresses... Products ordered with BTM address are shipped with an extra envelope'
        document.getElementsByClassName('address-book-sidebar-title')[0].innerHTML = 'Add a Back To Me address'
    } else {
        document.getElementsByClassName('address-list-notice')[0].innerHTML = 'Direct addresses are sent without an extra envelope to the recipient.'
        document.getElementsByClassName('address-book-sidebar-title')[0].innerHTML = 'Add a Direct address'
    }
    document.querySelectorAll('.add-address-book-button')[0].innerHTML = 'Add Address'

    document.forms['add-new-address-form']['address[id]'].value = 0
    document.forms['add-new-address-form']['address[firstName]'].value = ''
    document.forms['add-new-address-form']['address[lastName]'].value = ''
    document.forms['add-new-address-form']['address[firstLine]'].value = ''
    document.forms['add-new-address-form']['address[secondLine]'].value = ''
    document.forms['add-new-address-form']['address[townCity]'].value = ''
    document.forms['add-new-address-form']['address[countyState]'].value = ''
    document.forms['add-new-address-form']['address[country]'].value = 'United Kingdom'
    document.forms['add-new-address-form']['address[zip]'].value = ''
    document.forms['add-new-address-form']['address[phone]'].value = ''
    document.forms['add-new-address-form']['address[defaultAddress]'].checked = false

    if (event.target.classList.contains('address-book-type-link')) {
        let addresslinks = document.getElementsByClassName('address-book-type-link')
        for (i = 0; i < addresslinks.length; i++) {
            addresslinks[i].className = addresslinks[i].className.replace(' address-type-active', '')
        }
        event.currentTarget.className += ' address-type-active'
    }


    let filterlinks = document.getElementsByClassName('address-filter')
    for (i = 0; i < filterlinks.length; i++) {
        filterlinks[i].className = filterlinks[i].className.replace(' address-filter-selected', '')
    }

    displayResults()
}

const displayResults = () => {
    const directContainer = document.getElementById('address-book-container-grid')
    directContainer.innerHTML = ''
    let addressesAcu = ''

    addressesList.map((address, index) => {
        if (type === 'Indirect' && type === address.type) {
            if (filter === null || address.first_name.toLowerCase().charAt(0) === filter) {
                addressesAcu += `<div class="address-book-item-grid">
                                <div>
                                    <p class="address-book-name">${address.first_name} ${address.last_name}</p>
                                    ${address.address1 ? '<p class="address-book-address">' + address.address1 + '</p>' : ''}
                                    ${address.address2 ? '<p class="address-book-address">' + address.address2 + '</p>' : ''}
                                    ${address.city ? '<p class="address-book-address">' + address.city + '</p>' : ''}
                                    ${address.postcode ? '<p class="address-book-address">' + address.postcode + '</p>' : ''}
                                </div>
                                <div class="address-book-item-grid-right">
                                    ${address.default_address ? '<span class="address-book-default-address">Default Address</span>' : ''}
                                    ${!address.default_address ? '<button class="address-book-set-as-default" onClick="setDefault(' + index + ')" >Set as Default</button>' : ''}
                                    <div class="address-book-function">
                                        <button class="address-book-function-edit" onClick="editAddresses(${index})">Edit</button>
                                        <button class="address-book-function-delete" onClick="deleteAddresses(${address.id})">Delete</button>
                                    </div>
                                </div>
                            </div>`
            }
        } else if (type === 'Direct' && type === address.type) {
            if (filter === null || address.first_name.toLowerCase().charAt(0) === filter) {
                addressesAcu += `<div class="address-book-item-grid">
                                <div>
                                    <p class="address-book-name">${address.first_name} ${address.last_name}</p>
                                    ${address.address1 ? '<p class="address-book-address">' + address.address1 + '</p>' : ''}
                                    ${address.address2 ? '<p class="address-book-address">' + address.address2 + '</p>' : ''}
                                    ${address.city ? '<p class="address-book-address">' + address.city + '</p>' : ''}
                                    ${address.postcode ? '<p class="address-book-address">' + address.postcode + '</p>' : ''}
                                </div>
                                <div class="address-book-item-grid-right">
                                    <span>&nbsp;</span>
                                    <div class="address-book-function">
                                        <button class="address-book-function-edit" onClick="editAddresses(${index})">Edit</button>
                                        <button class="address-book-function-delete" onClick="deleteAddresses(${address.id})">Delete</button>
                                    </div>
                                </div>
                            </div>`
            }
        }
    })
    directContainer.innerHTML = addressesAcu
}

const filterAddresses = (event, newFilter) => {
     filter = newFilter

     let filterlinks = document.getElementsByClassName('address-filter')
     for (i = 0; i < filterlinks.length; i++) {
         filterlinks[i].className = filterlinks[i].className.replace(' address-filter-selected', '')
     }

     event.currentTarget.className += ' address-filter-selected'
     displayResults()
}

const setDefault = id => {
    apiUpdateAddress(
        addressesList[id].id,
        addressesList[id].first_name,
        addressesList[id].last_name,
        addressesList[id].address1,
        addressesList[id].address2,
        addressesList[id].city,
        addressesList[id].county,
        addressesList[id].country_name,
        addressesList[id].postcode,
        addressesList[id].phone,
        addressesList[id].type,
        true
    )
}

const editAddresses = addressId => {
    document.getElementsByName('address[firstName]')[0].value = addressesList[addressId].first_name
    document.getElementsByName('address[lastName]')[0].value = addressesList[addressId].last_name
    document.getElementsByName('address[firstLine]')[0].value = addressesList[addressId].address1
    document.getElementsByName('address[secondLine]')[0].value = addressesList[addressId].address2
    document.getElementsByName('address[townCity]')[0].value = addressesList[addressId].city
    document.getElementsByName('address[countyState]')[0].value = addressesList[addressId].county
    document.getElementsByName('address[country]')[0].value = addressesList[addressId].country_name
    document.getElementsByName('address[zip]')[0].value = addressesList[addressId].postcode
    document.getElementsByName('address[phone]')[0].value = addressesList[addressId].phone
    document.getElementsByName('address[id]')[0].value = addressesList[addressId].id
    document.getElementsByName('address[defaultAddress]')[0].checked = addressesList[addressId].default_address
    document.querySelectorAll('.add-address-book-button')[0].innerHTML = 'Update Address'
    document.querySelectorAll('.address-book-sidebar-title')[0].innerHTML = 'Update Address'
}

const deleteAddresses = id => {
    let text = 'Press OK to confirm address removal or Cancel.'
    if (!confirm(text) == true) return

    fetch(`/apps/scribblerApi/v1/shoppify/private/addresses/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            } else {
                return response.json()
            }
        })
        .then(response => {
            if (response.length > 0) {
                addressesList = response

                document.getElementById('customer-account-error').innerHTML = ''
                document.getElementById('customer-account-success').innerHTML = 'Address Deleted'
                displayResults()
                return
            } else {
                const directContainer = document.getElementById('address-book-container-grid')
                directContainer.innerHTML = ''
                document.getElementById('customer-account-error').innerHTML = "You don't have saved addresses"
                document.getElementById('customer-account-success').innerHTML = ''
                return
            }
        })
        .catch(e => {
            document.getElementById('customer-account-error').innerHTML = e.message
            document.getElementById('customer-account-success').innerHTML = ''
        })
        .finally(() => {})
}

const addAddress = ev => {
    ev.preventDefault()

    let id = document.forms['add-new-address-form']['address[id]'].value 
    let firstName = document.forms['add-new-address-form']['address[firstName]'].value
    let lastName = document.forms['add-new-address-form']['address[lastName]'].value
    let firstLine = document.forms['add-new-address-form']['address[firstLine]'].value
    let secondLine = document.forms['add-new-address-form']['address[secondLine]'].value
    let townCity = document.forms['add-new-address-form']['address[townCity]'].value
    let countyState = document.forms['add-new-address-form']['address[countyState]'].value
    let country = document.forms['add-new-address-form']['address[country]'].value
    let zip = document.forms['add-new-address-form']['address[zip]'].value
    let phone = document.forms['add-new-address-form']['address[phone]'].value
    let defaultAddress = document.forms['add-new-address-form']['address[defaultAddress]'].checked

    if (validateAddressForm(firstName, lastName, firstLine, townCity, countyState, zip, phone)) {
        if( parseInt(id) > 0 ) {
            apiUpdateAddress(id,firstName, lastName, firstLine, secondLine, townCity, countyState, country, zip, phone, type, defaultAddress)
        } else {
            apiAddAddress(firstName, lastName, firstLine, secondLine, townCity, countyState, country, zip, phone, type, defaultAddress )
        }
    }
}

const validateAddressForm = (firstName, lastName, firstLine, townCity, countyState, zip, phone) => {
    let formIsValid = true

    if (!firstName) {
        formIsValid = false
        document.querySelector('.first-name-error').innerHTML = '*First Name is required.'
    } else {
        document.querySelector('.first-name-error').innerHTML = ''
    }

    if (!lastName) {
        formIsValid = false
        document.querySelector('.last-name-error').innerHTML = '*Last Name is required.'
    } else {
        document.querySelector('.last-name-error').innerHTML = ''
    }

    if (!firstLine) {
        formIsValid = false
        document.querySelector('.first-line-error').innerHTML = '*Address line 1 is required.'
    } else {
        document.querySelector('.first-line-error').innerHTML = ''
    }

    if (!townCity) {
        formIsValid = false
        document.querySelector('.city-error').innerHTML = '*City is required.'
    } else {
        document.querySelector('.city-error').innerHTML = ''
    }

    if (!zip) {
        formIsValid = false
        document.querySelector('.postcode-error').innerHTML = '*Postcode is required.'
    } else {
        document.querySelector('.postcode-error').innerHTML = ''
    }

    return formIsValid
}

const apiUpdateAddress = (id,firstName, lastName, firstLine, secondLine, townCity, countyState, country, zip, phone, type, defaultAddress) => {
    const data = {
        id: id,
        first_name: firstName,
        last_name: lastName,
        address1: firstLine,
        address2: secondLine,
        city: townCity,
        county: countyState,
        zip: zip,
        phone: phone,
        country_name: country,
        type: type === 'Direct' ? 'Direct' : 'Indirect',
        default_address: defaultAddress
    }

    fetch(`/apps/scribblerApi/v1/shoppify/private/addresses/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: `application/json` }, body: JSON.stringify(data) })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            } else {
                return response.json()
            }
        })
        .then(response => {
            if (response.length > 0) {
                addressesList = response

                document.forms['add-new-address-form']['address[id]'].value = ''
                document.forms['add-new-address-form']['address[firstName]'].value = ''
                document.forms['add-new-address-form']['address[lastName]'].value = ''
                document.forms['add-new-address-form']['address[firstLine]'].value = ''
                document.forms['add-new-address-form']['address[secondLine]'].value = ''
                document.forms['add-new-address-form']['address[townCity]'].value = ''
                document.forms['add-new-address-form']['address[countyState]'].value = ''
                document.forms['add-new-address-form']['address[country]'].value = 'United Kingdom'
                document.forms['add-new-address-form']['address[zip]'].value = ''
                document.forms['add-new-address-form']['address[phone]'].value = ''
                document.forms['add-new-address-form']['address[defaultAddress]'].checked = false

                //clear errors
                document.getElementById('customer-account-error').innerHTML = ''
                document.getElementById('customer-account-success').innerHTML = 'Address Updated'
                document.querySelectorAll('.add-address-book-button')[0].innerHTML = 'Add Address'

                displayResults()
                return
            } else {
                document.getElementById('customer-account-error').innerHTML = "You don't have saved addresses"
                document.getElementById('customer-account-success').innerHTML = ''
                return
            }
        })
        .catch(e => {
            document.getElementById('customer-account-error').innerHTML = e.message
            document.getElementById('').innerHTML = ''
        })
        .finally(() => {})
}

const apiAddAddress = (firstName, lastName, firstLine, secondLine, townCity, countyState, country, zip, phone, type, defaultAddress) => {
    const data = {
        first_name: firstName,
        last_name: lastName,
        address1: firstLine,
        address2: secondLine,
        city: townCity,
        county: countyState,
        zip: zip,
        phone: phone,
        country_name: country,
        type: type === 'Direct' ? 'Direct' : 'Indirect',
        default_address: defaultAddress
    }

    fetch(`/apps/scribblerApi/v1/shoppify/private/addresses`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: `application/json` }, body: JSON.stringify(data) })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            } else {
                return response.json()
            }
        })
        .then(response => {
            if (response.length > 0) {
                addressesList = response

                document.forms['add-new-address-form']['address[firstName]'].value = ''
                document.forms['add-new-address-form']['address[lastName]'].value = ''
                document.forms['add-new-address-form']['address[firstLine]'].value = ''
                document.forms['add-new-address-form']['address[secondLine]'].value = ''
                document.forms['add-new-address-form']['address[townCity]'].value = ''
                document.forms['add-new-address-form']['address[countyState]'].value = ''
                document.forms['add-new-address-form']['address[country]'].value = 'United Kingdom'
                document.forms['add-new-address-form']['address[zip]'].value = ''
                document.forms['add-new-address-form']['address[phone]'].value = ''
                document.forms['add-new-address-form']['address[defaultAddress]'].checked = false

                
                document.getElementById('customer-account-error').innerHTML = ''
                document.getElementById('customer-account-success').innerHTML = 'Address Added'
               
               
displayResults()       

                return
            } else {
              document.getElementById('customer-account-error').innerHTML = "You don't have saved addresses"
              document.getElementById('customer-account-success').innerHTML = ''
              return
            }
        })
        .catch(e => {
            document.getElementById('customer-account-error').innerHTML = e.message
            document.getElementById('customer-account-success').innerHTML = ''
        })
        .finally(() => {})
}
