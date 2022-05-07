import { Audio } from "expo-av";
const sound = new Audio.Sound();
import store from "../store";
import { SetCurrent } from "../store/actions/SetCurrent";
import { SetInfo } from "../store/actions/SetInfo";

const UpdateStatus = async (SetValue, val, play, setPlay) => {
  try {
    let data = await sound.getStatusAsync();
    console.log(data);
    if (data.positionMillis == data.durationMillis) {
      await sound.stopAsync();
      setPlay(false);
    }
    if (store.getState().screen == true) {
      if (
        val == store.getState().current &&
        store.getState().info.isPlaying == true
      ) {
        SetValue((data.positionMillis / data.durationMillis) * 100);
      } else if (val != store.getState().current && play == false) {
        SetValue((data.positionMillis / data.durationMillis) * 100);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const Play = async (val, SetValue, play, setPlay) => {
  let status = await sound.getStatusAsync();

  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
  LoadAudio(val, SetValue, play, setPlay);
};

export const Start = async (val, SetValue, play, setPlay) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
  LoadAudio(val, SetValue, setPlay);
};

export const Pause = async (val) => {
  await sound.pauseAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const SeekUpdate = async (data, duration) => {
  try {
    const status = await sound.getStatusAsync();
    if (status.isLoaded === true) {
      const result = (data / 100) * status.durationMillis;
      await sound.setPositionAsync(result);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const LoadAudio = async (val, SetValue, play, setPlay) => {
  const status = await sound.getStatusAsync();
  if (status.isLoaded !== false && store.getState().screen == true) {
    sound.setOnPlaybackStatusUpdate(() =>
      UpdateStatus(SetValue, val, play, setPlay)
    );
  }
};
