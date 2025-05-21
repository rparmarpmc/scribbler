class PasswordResetButton extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', event => {
            event.preventDefault()
            const errors = []
            const spinner = document.getElementsByClassName('reset-spinner')
            spinner[0].classList.remove('hidden')

            //clear errors
            document.getElementById('errors').innerHTML = ''

            //validate form data
            const password = document.querySelector("input[name='new-password']").value
            const passwordConfirm = document.querySelector("input[name='new-password-confirm']").value
            const url = window.location
            const token = new URLSearchParams(url.search).get('token')

            if (token.length !== 42 ) errors.push('Token length is incorrect')
            if (password !== passwordConfirm) errors.push('Passwords are different')
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
                token,
                password
            })

            fetch(`/apps/scribblerApi/v1/shoppify/private/new_password`, config)
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
                         window.location = '/account/login'
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

customElements.define('password-reset-button', PasswordResetButton)
