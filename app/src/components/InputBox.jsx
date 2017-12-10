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

function createOnInputEnter ({ city, setCity, setTime }) {
  return async ({ key, target }) => {
    if (key === 'Enter') {
      try {
        const inputCity = target.value

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
}

export default React => {
  const InputBox = ({ city, setCity, setTime }) => {
    const onInputEnter = createOnInputEnter({ city, setCity, setTime })

    return (
      <div className='InputBox'>
        <input
          defaultValue={city}
          onKeyPress={onInputEnter}
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
