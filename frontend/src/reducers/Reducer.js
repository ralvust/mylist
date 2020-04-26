const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACK_METADATA':
      return {
        ...state,
        trackName: action.payload.name,
        duration: Math.floor(action.payload.duration)
      };          
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;