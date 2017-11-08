import createInputBox from './InputBox.jsx'
import createTimeResult from './TimeResult.jsx'
import createFooter from './Footer.jsx'

import '../styles/App.css'

export default React => {
  const InputBox = createInputBox(React)
  const TimeResult = createTimeResult(React)
  const Footer = createFooter(React)

  const App = (props, context) => {
    return {
      ...React.Component.prototype,
      props,
      context,
      state: {
        city: null
      },
      render() {
        return (
          <div className="App">
            <InputBox />
            <TimeResult />
            <Footer />
          </div>
        )
      }
    }
  }

  return App
}