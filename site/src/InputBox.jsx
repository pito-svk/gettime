import React, { Component } from 'react'
import './InputBox.css'

class InputBox extends Component {
  render () {
    return (
      <div className="InputBox">
        <input autofocus value="New York"></input>
      </div>
    )
  }
}

export default InputBox