const updateAccountDetails = ev => {
    ev.preventDefault()

    let firstName = document.forms['edit-customer-form']['firstName'].value.trim()
    let lastName = document.forms['edit-customer-form']['lastName'].value.trim()
    let updatedEmail = document.forms['edit-customer-form']['email'].value.trim();
    let email = window.originalCustomerEmail;
    let newEmail = (updatedEmail !== email) ? updatedEmail : null;
    let phone = document.forms['edit-customer-form']['phone'].value.trim();
    let password = document.forms['edit-customer-form']['password'].value.trim()
    let emailSubscribe = document.forms['edit-customer-form']['emailSubscribe'].checked
    let marketingAlcoholContent = document.forms['edit-customer-form']['marketingAlcoholContent'].checked
    let marketingChristmas = document.forms['edit-customer-form']['marketingChristmas'].checked
    let marketingEaster = document.forms['edit-customer-form']['marketingEaster'].checked
    let marketingFathersDay = document.forms['edit-customer-form']['marketingFathersDay'].checked
    let marketingMothersDay = document.forms['edit-customer-form']['marketingMothersDay'].checked
    let marketingValentinesDay = document.forms['edit-customer-form']['marketingValentinesDay'].checked
    let marketingHalloween = document.forms['edit-customer-form']['marketingHalloween'].checked
    let marketingRudeContent = document.forms['edit-customer-form']['marketingRudeContent'].checked
    let marketingNonSeasonal = document.forms['edit-customer-form']['marketingNonSeasonal'].checked

    if (validateAccountDetailsForm(firstName, lastName, email, phone, password)) {
        apiUpdateAccount(
            firstName,
            lastName,
            email,
            newEmail,
            phone,
            password,
            emailSubscribe,
            marketingAlcoholContent,
            marketingChristmas,
            marketingEaster,
            marketingFathersDay,
            marketingMothersDay,
            marketingValentinesDay,
            marketingHalloween,
            marketingRudeContent,
            marketingNonSeasonal
        )
    }
}


const validateAccountDetailsForm = (firstName, lastName, email, phone, password) => {
    let formIsValid = true

    if (!firstName) {
        formIsValid = false
        document.querySelector('.edit-customer-first-name-error').innerHTML = '*First Name is required.'
    } else {
        document.querySelector('.edit-customer-first-name-error').innerHTML = ''
    }

    if (!lastName) {
        formIsValid = false
        document.querySelector('.edit-customer-last-name-error').innerHTML = '*Last Name is required.'
    } else {
        document.querySelector('.edit-customer-last-name-error').innerHTML = ''
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        formIsValid = false;
        document.querySelector('.edit-customer-email-error').innerHTML = '*Please enter a valid email address.';
    } else {
        document.querySelector('.edit-customer-email-error').innerHTML = '';
    }

    if (!phone) {
        formIsValid = false
        document.querySelector('.edit-customer-phone-error').innerHTML = '*Phone Number is required.'
    } else {
        document.querySelector('.edit-customer-phone-error').innerHTML = ''
    }

    if (!password) {
        formIsValid = false
        document.querySelector('.edit-customer-password-error').innerHTML = '*Password is required.'
    } else {
        document.querySelector('.edit-customer-password-error').innerHTML = ''
    }

    return formIsValid
}


const apiUpdateAccount = (
    firstName,
    lastName,
    email,
    new_email,
    phone,
    password,
    emailSubscribe,
    marketingAlcoholContent,
    marketingChristmas,
    marketingEaster,
    marketingFathersDay,
    marketingMothersDay,
    marketingValentinesDay,
    marketingHalloween,
    marketingRudeContent,
    marketingNonSeasonal
) => {

    const data = {
        logged_in_customer_id: Shopify?.customer?.id || window.customerId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        email_subscribe: emailSubscribe,
        marketing_alcohol_content: marketingAlcoholContent,
        marketing_christmas: marketingChristmas,
        marketing_easter: marketingEaster,
        marketing_fathers_day: marketingFathersDay,
        marketing_mothers_day: marketingMothersDay,
        marketing_valentines_day: marketingValentinesDay,
        marketing_halloween: marketingHalloween,
        marketing_rude_content: marketingRudeContent,
        marketing_non_seasonal: marketingNonSeasonal
    }
if (new_email) {
    data.new_email = new_email;
}

    fetch(`/apps/scribblerApi/v1/shoppify/private/account`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: `application/json` }, body: JSON.stringify(data) })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status)
            } else {
                return response.json()
            }
        })
        .then(response => {
           if (response.success) {
                document.getElementById('customer-account-error').innerHTML = ''
                document.getElementById('customer-account-success').innerHTML = 'Your details has been updated'
            } else {
    document.getElementById('customer-account-error').innerHTML = response.error_msg
    ? response.error_msg.map(msg => `<div>${msg}</div>`).join('')
    : 'An error occurred.'
                document.getElementById('customer-account-success').innerHTML = ''
            }
        })
        .catch(e => {
            document.getElementById('customer-account-error').innerHTML = e.message
            document.getElementById('customer-account-success').innerHTML = ''
        })
        .finally(() => {})
}
