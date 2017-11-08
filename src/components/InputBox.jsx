import '../styles/InputBox.css'

// TODO: implement event handler to correct inputted city
function onInputKeyPress (event) {
  if (event.key === 'Enter') {
    const inputContent = event.target.value
  }
}

export default React => {
  const InputBox = props => {
    return (
      <div className="InputBox">
        <input autoFocus defaultValue='New York' onKeyPress={onInputKeyPress}></input>
      </div>
    )
  }

  return InputBox
}