const Reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STATE_Y':
      return {
        ...state,
        youtube: !state.youtube,
      }
    case 'CHANGE_STATE_F':
      return {
        ...state,
        facebook: !state.facebook,
      }
    case 'CHANGE_STATE_I':
      return {
        ...state,
        instagram: !state.instagram,
      }
    case 'CHANGE_STATE_O':
      return {
        ...state,
        osu: !state.osu,
      }
    case 'CHANGE_STATE_S':
      return {
        ...state,
        sport: !state.sport,
      }
    case 'CHANGE_STATE_T':
      return {
        ...state,
        tech: !state.tech,
      }
    case 'VALIDATE_SERVICE':
      return {
        ...state,
        validateService: !state.validateService,
      }
    default:
      return state
  }
}

export default Reducer
