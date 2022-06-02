import React, { useContext, createContext, useState } from "react";
import { Audio } from "expo-av";
import {
  AppProvider,
  useCurrent,
  useCurrentUpdate,
  usePlayingUpdate,
} from "./AppContext";
import { Alert } from "react-native";
const sound = new Audio.Sound();

const Playing = createContext();
const PlayPause = createContext();
const SoundContext = createContext();

export const usePlayPause = () => {
  return useContext(PlayPause);
};

export const useIsplaying = () => {
  return useContext(Playing);
};

export const useSound = () => {
  return useContext(SoundContext);
};

export const MusicProvider = ({ children }) => {
  const [isplaying, setIsPlaying] = useState(false);
  const [Loaded, SetLoaded] = useState(false);
  const setPlaying = usePlayingUpdate;
  const setCurrent = useCurrentUpdate();
  const current = useCurrent();

  const sound = React.useRef(new Audio.Sound());

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        setIsPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
        await sound.current.unloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const Play=async()=>{
  //     setIsPlaying(true)
  //     try{
  //       let status=await sound.current.getStatusAsync()
  //       if(status.isLoaded==false){
  //           await sound.current.loadAsync({uri:current.uri})
  //       }

  //     }catch(error){
  //       Alert.alert(`${error.message}`)
  //     }
  // }

  const HandlePlayPause = async () => {
    setIsPlaying(!isplaying);
    try {
      let status = await sound.current.getStatusAsync();
      if (isplaying == true) {
        return await sound.current.pauseAsync();
      }

      if (status.isLoaded == false) {
        await sound.current.loadAsync({ uri: current.uri });

        const result = await sound.current.getStatusAsync();
        if (result.isLoaded === true) {
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          SetLoaded(true);
        }
      } else if (status.isLoaded == true) {
        await sound.current.unloadAsync();
        await sound.current.loadAsync({ uri: item.secondsClip });

        await sound.current.playAsync();
      }
      await sound.current.playAsync();
      setCurrent(item);
    } catch (error) {
      setIsPlaying(false);
      Alert.alert("ERROR WHILE LOADING SONG", `${error.message}`);
    }
  };

  const UpdateStatus = async (data) => {
    try {
      // setPlaying(data);
      if (data.didJustFinish) {
        setIsPlaying(false);
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SoundContext.Provider value={sound}>
      <Playing.Provider value={isplaying}>
        <PlayPause.Provider value={HandlePlayPause}>
          <AppProvider>{children}</AppProvider>
        </PlayPause.Provider>
      </Playing.Provider>
    </SoundContext.Provider>
  );
};
