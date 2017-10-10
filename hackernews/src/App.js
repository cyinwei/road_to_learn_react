import React, { Component } from 'react'
import './App.css'

const list = [
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
  constructor(props) {
    super(props)
    this.onDismiss = this.onDismiss.bind(this)
    this.state = {
      list
    }
  }

  onDismiss(id) {
    let updated = this.state.list.filter(site =>
      id !== site.objectID)

    this.setState({
      list: updated
    })
  }
  render() {
    return (
      <div className='App'>
        {this.state.list.map(site =>
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
              <button onClick={() => this.onDismiss(site.objectID)}
                      type='button'>
                dismiss.
              </button>
          </div>
         )}       
      </div>
    )
  }
}

export default App;
