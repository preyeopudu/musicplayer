import { Audio } from "expo-av";
const sound = new Audio.Sound();
import store from "../store";
import { SetCurrent } from "../store/actions/SetCurrent";
import { SetInfo } from "../store/actions/SetInfo";

// refactor with store.dispatch and store.getState and refactor
// export const Load=(val)=>{
//     let status = await sound.getStatusAsync();
//   if(status.isLoaded){

//   }
//   await sound.loadAsync({uri:val.uri})
// }

// export const PlayPause = async (data) => {
//   let status = await sound.getStatusAsync();
//   if (status.isLoaded == false) {
//     await sound.loadAsync(data.uri);
//   }
//   if (status.isPlaying == true) {
//     await sound.pauseAsync();
//   }
// };

const UpdateStatus = async (data) => {
  try {
    if (data.didJustFinish) {
      ResetPlayer();
    } else if (data.positionMillis) {
      if (data.durationMillis) {
        SetValue((data.positionMillis / data.durationMillis) * 100);
      }
    }
  } catch (error) {
    console.log("Error");
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
    console.log("Error");
  }
};

export const Play = async (val) => {
  let status = await sound.getStatusAsync();
  if (status.isLoaded == false) {
    await sound.loadAsync({ uri: val.uri });
  }

  await sound.playAsync();
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const GetStatus = async () => {
  const status = await sound.getStatusAsync();
  console.log(status);
  return status;
};

export const Start = async (val) => {
  await sound.unloadAsync();
  await sound.loadAsync({ uri: val.uri });
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate(() => {
    console.log("hello");
  });
  store.dispatch(SetInfo(await sound.getStatusAsync()));
  store.dispatch(SetCurrent(val));
};

export const Pause = async () => {
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
