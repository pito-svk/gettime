import '../styles/InputBox.css'

export default React => {
  const InputBox = props => {
    return (
      <div className="InputBox">
        <input autoFocus value={`{TODO: city}`}></input>
      </div>
    )
  }

  return InputBox
}