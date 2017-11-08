import '../styles/InputBox.css'

export default React => {
  const InputBox = (props, context) => {

    return {
      ...React.Component.prototype,
      state: {
        city: props.defaultCity
      },
      render() {
        const onInputKeyPress = e => {
          if (e.key === 'Enter') {
            const inputContent = e.target.value

            this.setState({ city: inputContent })

            props.setCityOnRequest(inputContent)
          }
        }

        return (
          <div className="InputBox">
            <input value={this.state.city} autoFocus onKeyPress={onInputKeyPress} onChange={ e => this.setState({ city: e.target.value }) }></input>
          </div>
        )
      }
    }
  }

  return InputBox
}