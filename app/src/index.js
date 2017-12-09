import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import createApp from './components/App'
import storeReducer from './store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const preloadedState =
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(storeReducer, preloadedState)

const App = createApp(React)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
