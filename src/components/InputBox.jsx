import React, { Component } from 'react'
import '../styles/InputBox.css'

class InputBox extends Component {
  render () {
    return (
      <div className="InputBox">
        <input autoFocus value={`{TODO: city}`}></input>
      </div>
    )
  }
}

export default InputBox