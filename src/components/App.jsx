import createInputBox from './InputBox.jsx'
import createTimeResult from './TimeResult.jsx'
import createFooter from './Footer.jsx'

import '../styles/App.css'

export default React => {
  const InputBox = createInputBox(React)
  const TimeResult = createTimeResult(React)
  const Footer = createFooter(React)

  const defaultCity = 'New York'

  const App = (props, context) => {
    return {
      ...React.Component.prototype,
      state: {
        time: 'TODO - intialize on start',
        city: defaultCity
      },
      render() {
        return (
          <div className="App">
            <InputBox city={this.state.city} defaultCity={defaultCity} setCityOnRequest={ city => this.setState({ city }) } setTimeOnRequest={ time => this.setState({ time }) }/>
            <TimeResult city={this.state.city} time={this.state.time}/>
            <Footer />
          </div>
        )
      }
    }
  }

  return App
}