import '../styles/InputBox.css'
import { getCityTime } from '../remote/cityTime'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  city: state.city
})

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

function onInputKeyPress ({ city, setCity, setTime }) {
  return async e => {
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
}

const moveFocusAtEnd = e => {
  const temp_value = e.target.value
  e.target.value = ''
  e.target.value = temp_value
}

export default React => {
  const InputBox = ({ city, setCity, setTime }) => {
    return {
      async componentDidMount () {
        const { city: resultCity, time: resultTime } = await getCityTime(city)
        setCity(resultCity)
        setTime(resultTime)
      },
      render () {
        return (
          <div className='InputBox'>
            <input
              defaultValue={city}
              onKeyPress={onInputKeyPress({ city, setCity, setTime })}
              onFocus={moveFocusAtEnd}
              autoFocus />
          </div>
        )
      }
    }
  }

  const InputBoxWithReduxStore = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputBox)

  return InputBoxWithReduxStore
}
