import '../styles/InputBox.css'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

// Check for non 200 statuses and throw error on that case
function getCityOffset (city) {
  return fetch(`api/offset/${city}`)
    .then(resp => {
      if (!resp.ok) {
        return Promise.reject(resp.statusText)
      }

      return resp.json()
    })
}

export default React => {
  const InputBox = ({ city, previousCity, setPreviousCity, setCity, setTime }) => {
    return {
      ...React.Component.prototype,
      async componentDidMount () {
        const offset = await getCityOffset(city)

        setCity(offset.city)
        setTime(offset.time)
      },
      render () {
        const onInputKeyPress = async e => {
          if (e.key === 'Enter') {
            try {
              const inputCity = e.target.value

              setTime('...')

              const offset = await getCityOffset(inputCity)

              setPreviousCity(city)
              setCity(offset.city)
              setTime(offset.time)
            } catch (err) {
              const currentCity = previousCity
              const offset = await getCityOffset(currentCity)

              setCity(offset.city)
              setTime(offset.time)
            }
          }
        }

      // Move focus at end of input
      const moveFocusAtEnd = async e => {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
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
    }
  }

  const mapStateToProps = state => ({ city: state.city, previousCity: state.previousCity })

  const mapDispatchToProps = dispatch => {
    return {
      setPreviousCity: city => {
        dispatch({ type: 'SET_PREVIOUS_CITY', city })
      },
      setCity: city => {
        dispatch({ type: 'SET_CITY', city })
      },
      setTime: time => {
        dispatch({ type: 'SET_TIME', time })
      }
    }
  }

  const InputBoxWithReduxStore = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputBox)

  return InputBoxWithReduxStore
}
