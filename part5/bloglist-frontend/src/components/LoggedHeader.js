import React from 'react'
import PropTypes from 'prop-types'

const LoggedHeader = ({ username, handleSesion }) => {
  const handleLogout = () => {
    handleSesion()
  }

  return (
    <section>
      <p>
        {username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
    </section>
  )
}

LoggedHeader.propTypes = {
  username: PropTypes.string.isRequired,
  handleSesion: PropTypes.func.isRequired,
}

export default LoggedHeader
