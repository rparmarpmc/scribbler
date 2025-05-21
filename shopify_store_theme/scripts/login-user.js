class LoginUserButton extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', event => {
            event.preventDefault()
            const errors = []

            //clear errors
            document.getElementById('errors').innerHTML = ''

            //validate form data
            const email = document.querySelector("input[name='customer[email]']").value
            const password = document.querySelector("input[name='customer[password]']").value
            const spinner = document.getElementsByClassName('login-spinner')
            spinner[0].classList.remove('hidden')

            if (!email) errors.push('Email cannot be empty')
            if (!this.validateEmail(email)) errors.push('Email format is incorrect')
            if (!password) errors.push('Password cannot be empty')
            if (password && password.length < 8) errors.push('Password minimum length is 8 characters')

            if (errors.length > 0) {
                spinner[0].classList.add('hidden')
                this.handleErrorMessage(errors)
                return
            }

            const config = fetchConfig('javascript')
            config.headers['X-Requested-With'] = 'XMLHttpRequest'

            config.body = JSON.stringify({
                email,
                password,
                local: window.location.origin.includes('127.0.0.1') ? true : false,
                local_domain: window.location.origin,
                page: 'account'
            })

            fetch(`/apps/scribblerApi/v1/shoppify/private/login`, config)
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
                        document.getElementById('errors').innerHTML = ''

                        if (window.location.origin.includes('127.0.0.1')) {
                            window.location = response.data.token_url.replace('https:', 'http:')
                        } else if (response.data.token_url) {
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
        const errorsContainer = document.getElementById('errors')
        const ul = document.createElement('ul')

        errors.map(error => {
            const li = document.createElement('li')
            li.innerHTML = `<svg aria-hidden="true" focusable="false" role="presentation"><use href="#icon-error" /></svg>${error}`
            ul.appendChild(li)
        })
        errorsContainer.appendChild(ul)
    }
}

customElements.define('login-user-button', LoginUserButton)
