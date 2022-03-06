import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ errorStatus = null }) => {
  if (errorStatus === null) return null

  const { isError, message } = errorStatus

  return (
    <section className={`${isError ? 'error' : 'success'} notification`}>
      <p>{message}</p>
    </section>
  )
}

Notification.propTypes = {
  errorStatus: PropTypes.shape({
    isError: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }),
}

export default Notification
