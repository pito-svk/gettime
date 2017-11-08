import React, { Component } from 'react'
import './TimeResult.css'

class TimeResult extends Component {
  render () {
    return (
      <div className="TimeResult">
        <h1>{`{TODO: city}`} has {`{TODO: time}`}</h1>
      </div>
    )
  }
}

export default TimeResult