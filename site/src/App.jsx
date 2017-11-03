import React, { Component } from 'react'
import './App.css'
import InputBox from './InputBox.jsx'
import Footer from './Footer.jsx'
import TimeResult from './TimeResult.jsx'

class App extends Component {
  render () {
    return (
      <div className="App">
        <InputBox />
        <TimeResult />
        <Footer />
      </div>
    )
  }
}

export default App
