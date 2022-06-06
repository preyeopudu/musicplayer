import React, { useContext, createContext, useState } from "react";
import { Audio } from "expo-av";

Audio.setAudioModeAsync({ staysActiveInBackground: true });
const IsPlaying = createContext();
const IsPlayingUpdate = createContext();
const SoundContext = createContext();

export const useIsPlayingUpdate = () => {
  return useContext(IsPlayingUpdate);
};

export const useIsplaying = () => {
  return useContext(IsPlaying);
};

export const useSound = () => {
  return useContext(SoundContext);
};

export const MusicProvider = ({ children }) => {
  const [isplaying, setIsPlaying] = useState(false);
  const sound = React.useRef(new Audio.Sound());

  return (
    <SoundContext.Provider value={sound}>
      <IsPlaying.Provider value={isplaying}>
        <IsPlayingUpdate.Provider value={setIsPlaying}>
          {children}
        </IsPlayingUpdate.Provider>
      </IsPlaying.Provider>
    </SoundContext.Provider>
  );
};
