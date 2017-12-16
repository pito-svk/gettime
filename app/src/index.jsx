import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import createApp from './components/App'
import storeReducer from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers } from 'redux'

const preloadedState =
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()

const history = createHistory()

const store = createStore(
  combineReducers({
    store: storeReducer,
    routing: routerReducer
  }),
  preloadedState
)

const App = createApp(React)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
