const PlayingReducer = (state = false, action) => {
  switch (action.type) {
    case "PLAYING":
      let State = true;
      return State;
    case "NOTPLAYING":
      let data = false;
      return data;
    default:
      return state;
  }
};

export default PlayingReducer;
