import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import createApp from './components/App'
import storeReducer from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    store: storeReducer,
    routing: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware))
)

const App = createApp(React)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))
