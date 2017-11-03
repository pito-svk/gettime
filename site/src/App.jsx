import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import InputBox from './InputBox.jsx'
import Footer from './Footer.jsx'

class App extends Component {
  render () {
    return (
      <div className="App">
        <InputBox />
        <div className="TimeResult" />
        <Footer />
      </div>
    )
  }
}

export default App
