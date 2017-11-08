import '../styles/App.css'
// import InputBox from './InputBox.jsx'
import createFooter from './Footer.jsx'
// import TimeResult from './TimeResult.jsx'

import '../styles/App.css'

export default React => {
  const Footer = createFooter(React)

  const App = props => {
    return (
      <Footer />
    )
  }

  return App
}