const CurrentMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLAYING":
      let State = action.state;
      return State;
    default:
      return state;
  }
};

export default CurrentMusicReducer;