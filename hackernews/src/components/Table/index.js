import React from 'react'

export default Table = ({list, searchPattern, onDismiss}) => {
  return (
    <div>
      {/* filter the table by using the searchPattern */}
      {list.filter(isSearched)}
    </div>
  )
}