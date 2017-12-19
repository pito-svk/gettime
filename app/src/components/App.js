import '../styles/App.css'

import createInputBoxContainer from '../containers/InputBoxContainer'
import createTimeResult from './TimeResult'
import createFooter from './Footer'

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
