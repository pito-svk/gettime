import '../styles/App.css'
import createInputBox from './InputBox.jsx'
import createFooter from './Footer.jsx'
// import TimeResult from './TimeResult.jsx'

import '../styles/App.css'

export default React => {
  const InputBox = createInputBox(React)
  const Footer = createFooter(React)

  const App = props => {
    return (
      <div className="App">
        <InputBox />
        <Footer />
      </div>
    )
  }

  return App
}