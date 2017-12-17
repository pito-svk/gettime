import InputBox from '../components/InputBox'
import { connect } from 'react-redux'
import querystring from 'querystring'
import { push } from 'react-router-redux'

const mapStateToProps = ({ store, routing }) => {
  const query = querystring.parse(routing.location.search.substring(1))

  const initialCity = query.city

  return { city: store.city, initialCity }
}

const mapDispatchToProps = dispatch => {
  return {
    setCity: city => {
      dispatch({ type: 'SET_CITY', city })
    },
    setInitialCity: initialCity => {
      dispatch({ type: 'SET_INITIAL_CITY', initialCity })
    },
    setTime: time => {
      dispatch({ type: 'SET_TIME', time })
    },
    setCityUrl: city => {
      dispatch(
        push({
          location: '/',
          search: `?city=${city}`
        })
      )
    }
  }
}

export default React => {
  const InputBoxWithReduxStore = connect(mapStateToProps, mapDispatchToProps)(
    InputBox
  )

  return InputBoxWithReduxStore
}
