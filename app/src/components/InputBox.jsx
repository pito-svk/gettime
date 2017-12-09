import '../styles/InputBox.css'
import { getCityTime } from '../remote/cityTime'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    setCity: city => {
      dispatch({ type: 'SET_CITY', city })
    },
    setTime: time => {
      dispatch({ type: 'SET_TIME', time })
    }
  }
}

const moveFocusAtEnd = ({ target }) => {
  const tempValue = target.value
  target.value = ''
  target.value = tempValue
}

export default React => {
  const InputBox = ({ city, setCity, setTime }) => {

    async function onInputKeyPress (e) {
      if (e.key === 'Enter') {
          try {
            const inputCity = e.target.value

            setTime('...')

            const { city: resultCity, time: resultTime } = await getCityTime(inputCity)

            setCity(resultCity)
            setTime(resultTime)
          } catch (err) {
            const { city: resultCity, time: resultTime }  = await getCityTime(city)

            setCity(resultCity)
            setTime(resultTime)
          }
        }
    }

    return (
      <div className='InputBox'>
        <input
          defaultValue={city}
          onKeyPress={onInputKeyPress}
          onFocus={moveFocusAtEnd}
          autoFocus />
      </div>
    )
  }

  const InputBoxWithReduxStore = connect(
    ({ city }) => ({ city }),
    mapDispatchToProps
  )(InputBox)

  return InputBoxWithReduxStore
}
