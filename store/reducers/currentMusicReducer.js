const CurrentMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLAYING":
      return true;
    case "PAUSE":
      return false;
    default:
      return state;
  }
};

export default PlayReducer;
