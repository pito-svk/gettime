import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import createApp from './components/App'
import storeProvider from './store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(storeProvider, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = createApp(React)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
