const CurrentMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETCURRENT":
      let State = action.state;
      return State;
    default:
      return state;
  }
};

export default CurrentMusicReducer;
