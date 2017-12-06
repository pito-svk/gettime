export default (state = { city: 'New York', time: '...' }, { previousCity, city, time, type } = {}
  ) => {
  switch (type) {
    case 'SET_PREVIOUS_CITY':
      return { ...state, previousCity }
    case 'SET_CITY':
      return { ...state, city }
    case 'SET_TIME':
      return { ...state, time }
    default:
      return state
  }
}
