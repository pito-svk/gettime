import '../styles/App.css'

import createInputBox from './InputBox.jsx'
import createTimeResult from './TimeResult.jsx'
import createFooter from './Footer.jsx'

export default React => {
  const InputBox = createInputBox(React)
  const TimeResult = createTimeResult(React)
  const Footer = createFooter(React)

  const defaultCity = 'New York'

  const App = (props, context) => {
    return {
      ...React.Component.prototype,
      state: {
        time: '...',
        city: defaultCity
      },
      render () {
        const setCityOnRequest = city => this.setState({ city })
        const setTimeOnRequest = time => this.setState({ time })
        const getCurrentCity = () => this.state.city
        const currentCity = this.state.city
        const currentTime = this.state.time

        return (
          <div className='App'>
            <InputBox
              city={currentCity}
              defaultCity={defaultCity}
              setCityOnRequest={setCityOnRequest}
              setTimeOnRequest={setTimeOnRequest}
              getCurrentCity={getCurrentCity}
            />
            <TimeResult
              city={currentCity}
              time={currentTime}
            />
            <Footer />
          </div>
        )
      }
    }
  }

  return App
}
