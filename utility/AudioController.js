import { Audio } from "expo-av";
const sound = new Audio.Sound();
import store from "../store";
import { SetCurrent } from "../store/actions/SetCurrent";
import { SetInfo } from "../store/actions/SetInfo";
const currentItem = store.getState().current;

const UpdateStatus = async (setDuration, val, play) => {
  try {
    let data = await sound.getStatusAsync();
    if (store.getState().screen == true) {
      if (
        val == store.getState().current &&
        store.getState().info.isPlaying == true
      ) {
        setDuration(data.positionMillis / 1000);
      } else if (val != store.getState().current && play == false) {
        setDuration(data.positionMillis / 1000);
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

export const Play = async (val, setDuration, play) => {
  let status = await sound.getStatusAsync();
  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }
  console.log("here");
  sound.setOnPlaybackStatusUpdate(() => UpdateStatus(setDuration, val, play));
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const GetStatus = async () => {
  const status = await sound.getStatusAsync();
  console.log(status);
  return status;
};

export const Start = async (val, setDuration) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  sound.setOnPlaybackStatusUpdate(() => UpdateStatus(setDuration, val, play));
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const Pause = async (val) => {
  await sound.pauseAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const SeekUpdate = async (data, setDuration, duration) => {
  try {
    const checkLoading = await sound.getStatusAsync();
    if (checkLoading.isLoaded === true) {
      const result = (data / 100) * duration;
      console.log(data);
      setDuration(result);
      await sound.setPositionAsync(Math.round(result));
    }
  } catch (error) {
    console.log(error);
  }
};
