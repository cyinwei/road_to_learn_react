import React from 'react'

const Search = ({children, value, onChange, onSubmit}) =>
  <form onSubmit={onSubmit}>
    <input
      type='text'
      value={value}
      onChange={onChange}
      style={{width: '50%'}}
    />
    <button type="submit">
      {children}
    </button>
  </form>

export default Search