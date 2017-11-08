import '../styles/InputBox.css'

export default React => {
  const InputBox = ({ setCityOnRequest }) => {
    function onInputKeyPress (event) {
      if (event.key === 'Enter') {
        const inputContent = event.target.value

        setCityOnRequest(inputContent)
      }
    }

    return (
      <div className="InputBox">
        <input autoFocus defaultValue='New York' onKeyPress={onInputKeyPress}></input>
      </div>
    )
  }

  return InputBox
}