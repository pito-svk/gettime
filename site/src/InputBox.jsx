import React, { Component } from 'react'
import './InputBox.css'

class InputBox extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);

    this.state = { value: 'New York' }
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <div className="InputBox">
        <input autoFocus value={this.state.value} onChange={this.handleChange}></input>
      </div>
    )
  }
}

export default InputBox