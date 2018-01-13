import React, { Component } from 'react'
import './App.css'

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = 100

const BASE_PATH = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const QUERY_PARAM = 'query'
const PAGE_PARAM = 'page'
const HPP_PARAM = 'hitsPerPage'

const generateUrl = (searchTerm, page) =>
  `${BASE_PATH}${PATH_SEARCH}?${QUERY_PARAM}=${searchTerm}&\
${PAGE_PARAM}=${page}&${HPP_PARAM}=${DEFAULT_HPP}`

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
    type="button"
    className={className}
    onClick={onClick}
  >
    {children}
  </button>

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchTerm: DEFAULT_QUERY,
      searchKey: '',
      error: null
    }

    // binding this
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.needToFetchStories = this.needToFetchStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  /* sets the result from the HN Algolia API.
   * The result object stores the hits, an array of result, and the page num.
   */
  setSearchTopStories(result) {
    const { hits, page } = result // from the API
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : []
                   
    const updatedHits = [
      ...oldHits,
      ...hits
    ]
   
    this.setState({
      results: {
        ...results,
        [searchKey] : {hits: updatedHits, page},
      },
      searchKey
    })
  }

  needToFetchStories(searchTerm) {
    return !(this.state.results && this.state.results[searchTerm])
  }

  fetchSearchTopStories(searchTerm, page=0) {
    fetch(generateUrl(searchTerm, page))
    .then(response => {
      return response.json()
    })
    .then(result => this.setSearchTopStories(result))
    .catch(e => {
      console.log('error:', e)
      this.setState({ error: e.message })
    })
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.setState({searchKey: searchTerm})
    if (this.needToFetchStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault() // need this to prevent the refresh of the page
    // which will reset the state (so searchTerm == DEFAULT_QUERY)
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]
    const updatedHits = hits.filter((item) => {
      return item.objectID !== id
    })

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page},
      }
    })
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    const { searchTerm, searchKey, results, error } = this.state
    const page = (results && results[searchKey]
                  && results[searchKey].page) || 0
    const list = (results && results[searchKey]
                  && results[searchKey].hits) || []
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
      { 
        error ?
        <p style={{textAlign: 'center'}}>
          {error}
        </p>
        :list.length !== 0 ?
        <div className="interactions">
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
          <Button 
            onClick={() => this.fetchSearchTopStories(searchTerm, page+1)}
          >
            More        
          </Button>
        </div>
        :
        <p style={{textAlign: 'center'}}>Loading...</p>
      }
    </div>
  }
}

export default App
