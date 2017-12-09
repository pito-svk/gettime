import '../styles/TimeResult.css'
import { connect } from 'react-redux'

export default React => {
  const TimeResult = ({ city, time }) => {
    return (
      <div className='TimeResult'>
        <h1>{city} has {time}</h1>
      </div>
    )
  }

  const TimeResultWithReduxStore = connect(
    ({ city, time }) => ({ city, time })
  )(TimeResult)

  return TimeResultWithReduxStore
}
