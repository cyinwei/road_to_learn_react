import React, { Component } from 'react'
import './App.css'

const DEFAULT_QUERY = 'redux'

const BASE_PATH = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const url = `${BASE_PATH}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`
const generateUrl = (searchTerm) =>
  `${BASE_PATH}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`

console.log(url)

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
  <div className="table">
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
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    // binding this
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({result})
  }

  fetchSearchTopStories(searchTerm) {
    fetch(generateUrl(searchTerm), {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }

  onSearchChange(event) {
    console.log(event)
    this.setState({searchTerm: event.target.value})
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
    console.log(result)
    return <div className="page">
      <div className="interactions">
        <Search 
          value={this.state.searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
      </div>
      { result ?
        <Table
          list={this.state.result.hits}
          pattern={this.state.searchTerm}
          onDismiss={this.onDismiss}
        />
        :
        <p style={{textAlign: 'center'}}>Loading...</p>
      }
    </div>
  }
}

export default App
