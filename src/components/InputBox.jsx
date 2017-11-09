import '../styles/InputBox.css'

function getCityOffset (city) {
  return fetch(`api/offset/${city}`)
    .then(resp => resp.json())
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

              this.setState({ city: offset.city })

              props.setCityOnRequest(offset.city)
              props.setTimeOnRequest('...')
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