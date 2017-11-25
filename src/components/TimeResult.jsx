import '../styles/TimeResult.css'

export default React => {
  const TimeResult = props => {
    return (
      <div className='TimeResult'>
        <h1>{props.city} has {props.time}</h1>
      </div>
    )
  }

  return TimeResult
}
