import '../styles/InputBox.css'
import { getCityTime } from '../remote/cityTime'
import PropTypes from 'prop-types'
import reactStamp from 'react-stamp'

function createOnInputEnter ({
  city,
  setCity,
  setTime,
  setCityUrl,
  getCityTime
}) {
  return async ({ key, target }) => {
    if (key === 'Enter') {
      try {
        const inputCity = target.value

        setTime('...')

        const { city: resultCity, time: resultTime } = await getCityTime(
          inputCity
        )

        setCity(resultCity)
        setTime(resultTime)

        setCityUrl(resultCity)

        target.value = resultCity
      } catch (err) {
        const { city: resultCity, time: resultTime } = await getCityTime(city)

        setCity(resultCity)
        setTime(resultTime)

        setCityUrl(resultCity)

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

export default React => {
  const InputBox = reactStamp(React).compose({
    async componentDidMount () {
      try {
        const { city: resultCity, time: resultTime } = await getCityTime(this.props.initialCity || this.props.city)

        this.props.setCity(resultCity)
        this.props.setTime(resultTime)
        this.props.setInitialCity(null)

        this.props.setCityUrl(resultCity)

        this.textInput.value = resultCity
      } catch (err) {
        const { city: resultCity, time: resultTime } = await getCityTime(
        this.props.city
      )

        this.props.setCity(resultCity)
        this.props.setTime(resultTime)
        this.props.setInitialCity(null)

        this.props.setCityUrl(resultCity)

        this.textInput.value = resultCity
      }
    },

    render () {
      const onInputEnter = createOnInputEnter({
        ...this.props,
        getCityTime
      })

      return (
        <div className='InputBox'>
          <input
            ref={input => {
              this.textInput = input
            }}
            defaultValue={this.props.initialCity || this.props.city}
            onKeyPress={onInputEnter}
            onFocus={moveFocusAtEnd}
            spellCheck={false}
            autoFocus
        />
        </div>
      )
    }
  })

  InputBox.propTypes = {
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
  }

  return InputBox
}
