class CreateAccountButton extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', event => {
            event.preventDefault()
            const errors = []
            const spinner = document.getElementsByClassName('register-spinner')
            spinner[0].classList.remove('hidden')

            //clear errors
            document.getElementById('register-errors').innerHTML = ''

            //validate form data
            const firstName = document.querySelector("input[name='customer[first_name]']").value
            const lastName = document.querySelector("input[name='customer[last_name]']").value
            const email = document.querySelector("input[name='register-customer[email]']").value
            const password = document.querySelector("input[name='register-customer[password]']").value
            const privacy = document.querySelector("input[name='customer[privacy]']").checked
            const terms = document.querySelector("input[name='customer[terms]']").checked
            const marketing = document.querySelector("input[name='customer[marketing]']").checked

            if ( !firstName ) errors.push('First name cannot be empty')
            if ( !lastName ) errors.push('Last name cannot be empty')
            if ( !email ) errors.push('Email cannot be empty')
            if (!this.validateEmail(email)) errors.push('Email format is incorrect')
            if ( !password ) errors.push('Password cannot be empty')
            if ( password && password.length < 8 ) errors.push('Password minimum length is 8 characters')
            if (!privacy) errors.push('You must read and agree to our Privacy Policy')
            if (!terms) errors.push('You must read and agree to our Terms and Condition')

            if (errors.length > 0) {
                spinner[0].classList.add('hidden')
                this.handleErrorMessage(errors)
                return
            }

            // make api call
            const config = fetchConfig('javascript')
            config.headers['X-Requested-With'] = 'XMLHttpRequest'

            config.body = JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                privacy,
                terms,
                marketing
            })

            fetch(`/apps/scribblerApi/v1/shoppify/private/register`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP status ' + response.status)
                    } else {
                        return response.json()
                    }
                })
                .then(response => {
                    if (response.success) {
                        spinner[0].classList.add('hidden')
                        //clear errors
                        document.getElementById('register-errors').innerHTML = ''

                        if (response.data.token_url) {
                            window.location = response.data.token_url
                        } else {
                            this.handleErrorMessage(['Multipass token not available'])
                        }
                        return
                    } else {
                        spinner[0].classList.add('hidden')
                        this.handleErrorMessage(response.error_msg)
                        return
                    }
                })
                .catch(e => {
                    spinner[0].classList.add('hidden')
                    this.handleErrorMessage([e.message])
                })
                .finally(() => {})
        })
    }

    validateEmail = email => {
        if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) return true
        
        return false
    }

    handleErrorMessage = errors => {
        const errorsContainer = document.getElementById('register-errors')
        const ul = document.createElement('ul')
       
        errors.map(error => {
            const li = document.createElement('li')
            li.innerHTML = `<svg aria-hidden="true" focusable="false" role="presentation"><use href="#icon-error" /></svg>${error}`
            ul.appendChild(li)
        })
        errorsContainer.appendChild(ul)
    }
}

customElements.define('create-account-button', CreateAccountButton)
