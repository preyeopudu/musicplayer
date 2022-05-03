import { Audio } from "expo-av";
const sound = new Audio.Sound();

export const Play = async (val) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  const status = await sound.getStatusAsync();
  console.log(status);
  if (status.isLoaded == true) {
    await sound.playAsync();
  }
};

export const Pause = async (val) => {
  const status = await sound.getStatusAsync();
  if (status.isLoaded == true && status.isPlaying == true) {
    await sound.pauseAsync();
  }
};
