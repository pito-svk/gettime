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
      render() {
        const setCityOnRequest = city => this.setState({ city })
        const setTimeOnRequest = time => this.setState({ time })
        const getCurrentCity = () => this.state.city

        return (
          <div className="App">
            <InputBox
              city={ this.state.city }
              defaultCity={ defaultCity }
              setCityOnRequest={ setCityOnRequest }
              setTimeOnRequest={ setTimeOnRequest }
              getCurrentCity={ getCurrentCity }
            />
            <TimeResult
              city={ this.state.city }
              time={ this.state.time }
            />
            <Footer />
          </div>
        )
      }
    }
  }

  return App
}