const MusicReducer = (state = {}, action) => {
  switch (action.type) {
    case "GETMUSIC":
      let State = action.music;
      return State;
    default:
      return state;
  }
};

export default MusicReducer;
