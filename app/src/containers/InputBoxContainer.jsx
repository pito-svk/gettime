import createInputBox from '../components/InputBox.jsx'
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

export default React => {
  const InputBox = createInputBox(React)

  const InputBoxContainer = ({ city, setCity, setTime }) => {
    const componentDidMount = async () => {
      const { city: resultCity, time: resultTime } = await getCityTime(city)

      setCity(resultCity)
      setTime(resultTime)
    }

    const render = () => {
      return (
        <InputBox
          city={city}
          setCity={setCity}
          setTime={setTime}
          getCityTime={getCityTime}
        />
      )
    }

    return { render, componentDidMount }
  }

  const InputBoxContainerWithReduxStore = connect(
    ({ city }) => ({ city }),
    mapDispatchToProps
  )(InputBoxContainer)

  return InputBoxContainerWithReduxStore
}
