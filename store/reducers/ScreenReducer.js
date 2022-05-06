const ScreenReducer = (state = false, action) => {
  switch (action.type) {
    case "ON":
      let State = true;
      return State;
    case "OFF":
      let data = false;
      return data;
    default:
      return state;
  }
};

export default ScreenReducer;
