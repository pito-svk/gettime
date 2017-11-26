import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import createApp from './components/App'

const App = createApp(React)

ReactDOM.render(<App />, document.getElementById('root'))
