export const SetPlaying = (playing) => {
  const action = {
    type: "SETPLAYING",
    state: playing,
  };
  return action;
};
