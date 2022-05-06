const PlayingReducer = (state = false, action) => {
  switch (action.type) {
    case "SETPLAYING":
      let State = action.state;
      return State;
    default:
      return state;
  }
};

export default PlayingReducer;
