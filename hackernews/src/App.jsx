import React, { Component } from 'react'
// import './App.css'

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
    />
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div>
    {list.filter(isSearched(pattern)).map(site =>
      <div key={site.objectID}>
        <h3><a href={site.url}>{site.title}</a></h3>
        <p>{site.author}</p>
        <p>{site.num_comments} comments</p>
        <p>{site.points}</p>          
        <Button
          onClick={() => onDismiss(site.objectID)}
        >
          dismiss.
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
    return <div>
      <Search 
        value={this.state.searchTerm}
        onChange={this.onSearchChange}
      />
      <Table
        list={this.state.list}
        pattern={this.state.searchTerm}
        onDismiss={this.onDismiss}
      />
    </div>
  }
}

export default App
