const STATE_DEFAULTS = { city: 'New York', time: '...', initialCity: 'INITIAL_NULL' }

export default (state = STATE_DEFAULTS, { type, city, initialCity, time } = {}
  ) => {
  switch (type) {
    case 'SET_CITY':
      return { ...state, city }
    case 'SET_INITIAL_CITY':
      return { ...state, initialCity }
    case 'SET_TIME':
      return { ...state, time }
    default:
      return state
  }
}
