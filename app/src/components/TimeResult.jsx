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

  const mapStateToProps = state => ({
    city: state.city,
    time: state.time
  })

  const TimeResultWithReduxStore = connect(
    mapStateToProps
  )(TimeResult)

  return TimeResultWithReduxStore
}
