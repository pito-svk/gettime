import '../styles/InputBox.css'

// Make statful and then set state to city get from server
export default React => {
  const InputBox = (props, context) => {
    function onInputKeyPress (event) {
      if (event.key === 'Enter') {
        const inputContent = event.target.value

        props.setCityOnRequest(inputContent)
      }
    }

    return {
      ...React.Component.prototype,
      props,
      context,
      state: {
        city: props.defaultCity
      },
      render() {
        return (
          <div className="InputBox">
            <input autoFocus defaultValue={props.defaultCity} onKeyPress={onInputKeyPress}></input>
          </div>
        )
      }
    }
  }

  return InputBox
}