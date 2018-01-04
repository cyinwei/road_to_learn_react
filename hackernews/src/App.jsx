import React, { Component } from 'react'
import './App.css'

const DEFAULT_QUERY = 'redux'

const BASE_PATH = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const generateUrl = (searchTerm) =>
  `${BASE_PATH}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`

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
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    // binding this
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({result})
  }

  fetchSearchTopStories(searchTerm) {
    fetch(generateUrl(searchTerm), {
      mode: 'cors'
    })
      .then(response => {
        console.log(response)
        return response.json()}
      )
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault() // need this to prevent the refresh of the page
    // which will reset the state (so searchTerm == DEFAULT_QUERY)
  }

  onDismiss(id) {
    let updatedHits = this.state.result.hits.filter(post => 
      id !== post.objectID)
    
    console.log({...this.state.result})

    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    const { searchTerm, result } = this.state
    return <div className="page">
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
      </div>
      { result ?
        <Table
          list={this.state.result.hits}
          onDismiss={this.onDismiss}
        />
        :
        <p style={{textAlign: 'center'}}>Loading...</p>
      }
    </div>
  }
}

export default App
