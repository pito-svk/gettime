import '../styles/InputBox.css'
import { getCityTime } from '../remote/cityTime'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

function createOnInputEnter ({ city, setCity, setTime, getCityTime }) {
  return async ({ key, target }) => {
    if (key === 'Enter') {
      try {
        const inputCity = target.value

        setTime('...')

        const { city: resultCity, time: resultTime } = await getCityTime(inputCity)

        setCity(resultCity)
        setTime(resultTime)

        target.value = resultCity
      } catch (err) {
        const { city: resultCity, time: resultTime } = await getCityTime(city)

        setCity(resultCity)
        setTime(resultTime)

        target.value = resultCity
      }
    }
  }
}

const moveFocusAtEnd = ({ target }) => {
  const tempValue = target.value
  target.value = ''
  target.value = tempValue
}

class InputBox extends Component {
  async componentDidMount () {
    try {
      const { city: resultCity, time: resultTime } = await getCityTime(this.props.initialCity || this.props.city)

      this.props.setCity(resultCity)
      this.props.setTime(resultTime)
      this.props.setInitialCity(null)

      this.textInput.value = resultCity
    } catch (err) {
      const { city: resultCity, time: resultTime } = await getCityTime(this.props.city)

      this.props.setCity(resultCity)
      this.props.setTime(resultTime)
      this.props.setInitialCity(null)

      this.textInput.value = resultCity
    }
  }

  render () {
    const onInputEnter = createOnInputEnter({ city: this.props.city, setCity: this.props.setCity, setTime: this.props.setTime, getCityTime })

    return (
      <div className='InputBox'>
        <input
          ref={(input) => { this.textInput = input }}
          defaultValue={this.props.initialCity || this.props.city}
          onKeyPress={onInputEnter}
          onFocus={moveFocusAtEnd}
          autoFocus />
      </div>
    )
  }
}

InputBox.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired
}

export { InputBox as default }
