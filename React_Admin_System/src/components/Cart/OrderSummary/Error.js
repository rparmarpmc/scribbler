import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const Error = ({ error }) => {
    const messageRef = useRef('')
    const [message, setMessage] = useState(error)

    useEffect(() => {
        setMessage(error)

        setTimeout(() => {
            messageRef.current.classList.add('alert-hidden')
        }, 4000)

        setTimeout(() => {
            messageRef.current.classList.add('alert-hidden-height')
        }, 4000)

        setTimeout(() => {
            messageRef.current.remove()
        }, 5300)
    }, [])

    return <div ref={messageRef}>{message && <>{message}</>}</div>
}

export default Error

Error.propTypes = {
    error: PropTypes.string.isRequired
}
