import createInputBox from '../components/InputBox'
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

  const InputBoxWithReduxStore = connect(
    ({ city }) => ({ city }),
    mapDispatchToProps
  )(InputBox)

  return InputBoxWithReduxStore
}
