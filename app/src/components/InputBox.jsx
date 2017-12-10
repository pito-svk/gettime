import '../styles/InputBox.css'
import { getCityTime } from '../remote/cityTime'

const moveFocusAtEnd = ({ target }) => {
  const tempValue = target.value
  target.value = ''
  target.value = tempValue
}

function createOnInputEnter ({ city, setCity, setTime, getCityTime }) {
  return async ({ key, target }) => {
    if (key === 'Enter') {
      try {
        const inputCity = target.value

        setTime('...')

        const { city: resultCity, time: resultTime } = await getCityTime(inputCity)

        setCity(resultCity)
        setTime(resultTime)
      } catch (err) {
        const { city: resultCity, time: resultTime } = await getCityTime(city)

        setCity(resultCity)
        setTime(resultTime)
      }
    }
  }
}

export default React => {
  const InputBox = ({ city, setCity, setTime }) => {
    const onInputEnter = createOnInputEnter({ city, setCity, setTime, getCityTime })

    const componentDidMount = async () => {
      const { city: resultCity, time: resultTime } = await getCityTime(city)

      setCity(resultCity)
      setTime(resultTime)
    }

    const render = () => {
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

    return { render, componentDidMount }
  }

  return InputBox
}
