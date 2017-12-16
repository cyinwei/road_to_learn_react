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

const isSearched = (searchTerm) =>
  (site) => {
    return !searchTerm.trim() || // '' -> return all values
           site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           site.author.toLowerCase().includes(searchTerm.toLowerCase())
  }

const Search = ({value, onChange}) =>
  <form>
    <input
      type='text'
      value={value}
      onChange={onChange}
      style={{width: '50%'}}
    />
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div classname="table">
    {list.filter(isSearched(pattern)).map(site =>
      <div key={site.objectID} className="table-row">
        <h3 className="table-text" style={{width: '40%'}}>
          <a href={site.url}>{site.title}</a>
        </h3>
        <p style={{width: '30%'}}>{site.author}</p>
        <p style={{width: '10%'}}>{site.num_comments} comments</p>
        <p style={{width: '10%'}}>{site.points}</p>
        <Button
          onClick={() => onDismiss(site.objectID)}
          className="button-inline table-text"
          >
            dismiss
        </Button>
      </div>
     )}  
  </div>

const Button = ({children, onClick, className}) =>
  <button
    type='button'
    className={className}
    onClick={onClick}
  >
    {children}
  </button>

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }

    // binding this
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onSearchChange(event) {
    console.log(event)
    this.setState({searchTerm: event.target.value})
  }

  onDismiss(id) {
    let updatedList = this.state.list.filter(site => 
      id !== site.objectID)
    
    this.setState({list: updatedList})
  }

  render() {
    return <div className="page">
      <div className="interactions">
        <Search 
          value={this.state.searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
      </div>
     
      <Table
        list={this.state.list}
        pattern={this.state.searchTerm}
        onDismiss={this.onDismiss}
      />
    </div>
  }
}

export default App
