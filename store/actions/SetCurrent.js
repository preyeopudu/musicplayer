export const SetCurrent = (state) => {
  const action = {
    type: "PLAYING",
    state,
  };
  return action;
};
