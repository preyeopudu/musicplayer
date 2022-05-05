export const SetCurrent = (state) => {
  const action = {
    type: "SETCURRENT",
    state,
  };
  return action;
};
