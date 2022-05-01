export const GetMusic = (music) => {
  const action = {
    type: "GETMUSIC",
    music,
  };
  return action;
};
