import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>{' '}
    <input type={type} id={id} value={value} onChange={onChange}/>
  </div>
)

Input.propTypes = {
  id: PropTypes.string. isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input
