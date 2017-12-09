const STATE_DEFAULTS = { city: 'New York', time: '...' }

export default (state = STATE_DEFAULTS, { type, city, time } = {}
  ) => {
  switch (type) {
    case 'SET_CITY':
      return { ...state, city }
    case 'SET_TIME':
      return { ...state, time }
    default:
      return state
  }
}
