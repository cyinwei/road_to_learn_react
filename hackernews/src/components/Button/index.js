import React from 'react'

const Button = ({children, onClick, className}) =>
  <button
    type="button"
    className={className}
    onClick={onClick}
  >
    {children}
  </button>

export default Button