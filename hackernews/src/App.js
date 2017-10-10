import React, { Component } from 'react'
import './App.css'

const pst = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, 
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]
class App extends Component {
  render() {
    return (
      <div className='App'>
        {pst.map(site =>
          <div key={site.objectID}>
            <h3><a href={site.url}>{site.title}</a></h3>
              <p>
                Author: {site.author}
              </p>
              <p>
                {site.num_comments} comments
              </p>
              <p>
                {site.points}
              </p>
          </div>
         )}       
      </div>
    )
  }
}

export default App;
