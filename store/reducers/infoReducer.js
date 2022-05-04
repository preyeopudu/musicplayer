const InfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLAY":
      let State = action.state;
      return State;
    default:
      return state;
  }
};

export default InfoReducer;
