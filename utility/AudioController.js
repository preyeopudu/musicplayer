import { Audio } from "expo-av";
const sound = new Audio.Sound();

export const Play = async (val) => {
  let status = await sound.getStatusAsync();
  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }
  await sound.playAsync();
  let s = await sound.getStatusAsync();
  return s;
};

export const Pause = async (val) => {
  const status = await sound.getStatusAsync();
  if (status.isLoaded == true && status.isPlaying == true) {
    await sound.pauseAsync();
  }
};

export const SeekUpdate = async (data) => {
  try {
    const checkLoading = await sound.getStatusAsync();
    if (checkLoading.isLoaded === true) {
      const result = (data / 100) * Duration;
      await sound.setPositionAsync(Math.round(result));
    }
  } catch (error) {
    console.log("Error");
  }
};
