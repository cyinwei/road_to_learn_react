import React from 'react'
import ReactDOM from 'react-dom'
import App from './App' 
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()

// enables hot module reloading for development
if (module.hot) {
  module.hot.accept()
}