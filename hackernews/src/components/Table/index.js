import React from 'react'

import Button from '../Button'

const overflowStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
    {list.map(site =>
      <div key={site.objectID} className="table-row">
        <h3 className="table-text" style={{width: '40%'}}>
          <a href={site.url}>{site.title}</a>
        </h3>
        <p style={{width: '30%', ...overflowStyle}}>
          {site.author}
        </p>
        <p style={{width: '10%', ...overflowStyle}}>
          {site.num_comments} comments
        </p>
        <p style={{width: '10%', ...overflowStyle}}>
          {site.points}
        </p>
        <Button style={overflowStyle}
          onClick={() => onDismiss(site.objectID)}
          className="button-inline table-text"
        >
          dismiss
        </Button>
      </div>
     )}  
  </div>

export default Table