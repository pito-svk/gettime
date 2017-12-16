import '../styles/TimeResult.css'
import { connect } from 'react-redux'
import querystring from 'querystring'

export default React => {
  const TimeResult = ({ city, initialCity, time }) => {
    return (
      <div className='TimeResult'>
        <h1>{initialCity || city} has {time}</h1>
      </div>
    )
  }

  const TimeResultWithReduxStore = connect(
    ({ store, routing }) => {
      const query = querystring.parse(routing.location.search.substring(1))

      let initialCity

      if (store.initialCity === 'INITIAL_NULL') {
        initialCity = query.city
      }

      return { city: store.city, initialCity, time: store.time }
    }
  )(TimeResult)

  return TimeResultWithReduxStore
}
