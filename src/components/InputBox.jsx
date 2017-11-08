import '../styles/InputBox.css'

async function getCityOffset (city) {
  try {
    const offset = await fetch(`/offset/${city}`)

    return offset
  } catch (err) {
    console.log(err)
  }

  return fetch(`/offset/${city}`)
}

export default React => {
  const InputBox = (props, context) => {

    return {
      ...React.Component.prototype,
      state: {
        city: props.defaultCity
      },
      render() {
        const onInputKeyPress = async e => {
          if (e.key === 'Enter') {
            try {
              const inputCity = e.target.value

              const offset = await getCityOffset(inputCity)

              this.setState({ city: inputCity })

              props.setCityOnRequest(inputCity)
            } catch (err) {
              console.log(err)
            }
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