import React, { Component } from 'react'
import './InputBox.css'

class InputBox extends Component {
  constructor(props) {
    super(props)

    this.onChange = props.onChange.bind(this)
  }

  render () {
    return (
      <div className="InputBox">
        <input autoFocus value={this.value} onChange={this.onChange}></input>
      </div>
    )
  }
}

export default InputBox