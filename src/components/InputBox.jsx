import '../styles/InputBox.css'

// Check for non 200 statuses and throw error on that case
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
      async componentDidMount() {
        const offset = await getCityOffset(props.defaultCity)

        this.setState({ city: offset.city })

        props.setCityOnRequest(offset.city)
        props.setTimeOnRequest(offset.time)
      },
      render() {
        const onInputKeyPress = async e => {
          if (e.key === 'Enter') {
            try {
              const inputCity = e.target.value

              props.setTimeOnRequest('...')

              const offset = await getCityOffset(inputCity)

              this.setState({ city: offset.city })

              props.setCityOnRequest(offset.city)
              props.setTimeOnRequest(offset.time)
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