import '../styles/App.css'

import createInputBoxContainer from '../containers/InputBoxContainer.jsx'
import createTimeResult from './TimeResult.jsx'
import createFooter from './Footer.jsx'

export default React => {
  const InputBoxContainer = createInputBoxContainer(React)
  const TimeResult = createTimeResult(React)
  const Footer = createFooter(React)

  const App = () => {
    const render = () => {
      return (
        <div className='App'>
          <InputBoxContainer />
          <TimeResult />
          <Footer />
        </div>
      )
    }

    return { render }
  }

  return App
}
