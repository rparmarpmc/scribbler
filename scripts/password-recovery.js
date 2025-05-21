class PasswordRecoveryButton extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', event => {
            event.preventDefault()
            const errors = []
            const spinner = document.getElementsByClassName('recovery-spinner')
            spinner[0].classList.remove('hidden')

            //clear errors
            document.getElementById('errors').innerHTML = ''

            //validate form data
            const email = document.querySelector("input[name='email']").value

            if (!email) errors.push('Email cannot be empty')
            if (!this.validateEmail(email)) errors.push('Email format is incorrect')

            if (errors.length > 0) {
                spinner[0].classList.add('hidden')
                document.getElementById('success').innerHTML = ''
                this.handleErrorMessage(errors)
                return
            }

            const config = fetchConfig('javascript')
            config.headers['X-Requested-With'] = 'XMLHttpRequest'

            config.body = JSON.stringify({
                email
            })

            fetch(`/apps/scribblerApi/v1/shoppify/private/password_reset`, config)
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
                        document.getElementById('errors').innerHTML = ''
                        this.handleSuccessMessage(['Email sent'])
                        return
                    } else {
                        spinner[0].classList.add('hidden')
                        document.getElementById('success').innerHTML = ''
                        this.handleErrorMessage(response.error_msg)
                        return
                    }
                })
                .catch(e => {
                    spinner[0].classList.add('hidden')
                    document.getElementById('success').innerHTML = ''
                    this.handleErrorMessage([e.message])
                })
                .finally(() => {})
        })
    }

    validateEmail = email => {
        if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) return true

        return false
    }

    handleSuccessMessage = () => {
        const successContainer = document.getElementById('success')
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        li.innerHTML = `<svg aria-hidden="true" focusable="false" role="presentation"><use href="#icon-success" /></svg>Email sent`
        ul.appendChild(li)
   
        successContainer.appendChild(ul)
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

customElements.define('password-recovery-button', PasswordRecoveryButton)
