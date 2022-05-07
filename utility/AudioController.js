import { Audio } from "expo-av";
const sound = new Audio.Sound();
import store from "../store";
import { SetCurrent } from "../store/actions/SetCurrent";
import { SetInfo } from "../store/actions/SetInfo";
import { OnScreen } from "../store/actions/SetOnScreen";
const currentItem = store.getState().current;

const UpdateStatus = async (SetValue, val, play) => {
  try {
    let data = await sound.getStatusAsync();
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

export const Play = async (val, SetValue) => {
  let status = await sound.getStatusAsync();
  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
  LoadAudio(val, SetValue);
};

export const GetStatus = async () => {
  const status = await sound.getStatusAsync();
  console.log(status);
  return status;
};

export const Start = async (val, SetValue) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
  LoadAudio(val, SetValue);
};

export const Pause = async (val) => {
  await sound.pauseAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

// const Update=()=>{
//   const status = await sound.getStatusAsync()
//   if(status.isLoaded==true){

//   }
// }

export const SeekUpdate = async (data, duration) => {
  try {
    const status = await sound.getStatusAsync();
    if (status.isLoaded === true) {
      const result = (data / 100) * status.durationMillis;
      await sound.setPositionAsync(result);
      console.log(result);
      //SetValue(result);
      // await sound.setPositionAsync(Math.round(result));
    }
  } catch (error) {
    console.log(error);
  }
};

export const LoadAudio = async (val, SetValue) => {
  const status = await sound.getStatusAsync();
  console.log(status);
  if (status.isLoaded !== false && store.getState().screen == true) {
    sound.setOnPlaybackStatusUpdate(() => UpdateStatus(SetValue, val));
  }
};
