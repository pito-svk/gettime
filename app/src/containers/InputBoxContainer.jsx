import InputBox from '../components/InputBox'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { city: state.city }
}

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
  const InputBoxWithReduxStore = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputBox)

  return InputBoxWithReduxStore
}
