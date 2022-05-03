export const SetCurrent = (current) => {
  const action = {
    type: "SETCURRENT",
    current,
  };
  return action;
};
