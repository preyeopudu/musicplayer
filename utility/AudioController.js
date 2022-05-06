import { Audio } from "expo-av";
const sound = new Audio.Sound();
import store from "../store";
import { SetCurrent } from "../store/actions/SetCurrent";
import { SetInfo } from "../store/actions/SetInfo";

const UpdateStatus = async (setDuration) => {
  try {
    let data = await sound.getStatusAsync();
    if (data.isPlaying && onScreen == true) {
      setDuration(data.positionMillis / 1000);
    } else if (data.positionMillis) {
      if (data.durationMillis) {
        // SetValue((data.positionMillis / data.durationMillis) * 100);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const ResetPlayer = async () => {
  try {
    const checkLoading = await sound.getStatusAsync();
    if (checkLoading.isLoaded === true) {
      SetValue(0);
      SetPlaying(false);
      await sound.setPositionAsync(0);
      await sound.stopAsync();
    }
  } catch (error) {
    console.log(error);
  }
};

export const Play = async (val, setDuration, onScreen) => {
  let status = await sound.getStatusAsync();
  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }
  sound.setOnPlaybackStatusUpdate(() => UpdateStatus(setDuration, onScreen));
  await sound.playAsync();
  store.dispatch(SetCurrent(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const GetStatus = async () => {
  const status = await sound.getStatusAsync();
  console.log(status);
  return status;
};

// sound.setOnPlaybackStatusUpdate(() => {
//   console.log("hello");
// });

export const Start = async (val) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const Pause = async (val) => {
  await sound.pauseAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const SeekUpdate = async (data) => {
  try {
    const checkLoading = await sound.getStatusAsync();
    if (checkLoading.isLoaded === true) {
      const result = (data / 100) * Duration;
      await sound.setPositionAsync(Math.round(result));
    }
  } catch (error) {
    console.log(error);
  }
};
