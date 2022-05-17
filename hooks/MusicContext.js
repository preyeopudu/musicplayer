import { useContext } from "react";
import { createContext, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
const sound = new Audio.Sound();

export const MusicContext = createContext();
export const MusicUpdateContext = createContext();
export const SoundContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const useMusicUpate = () => {
  return useContext(MusicUpdateContext);
};

export const useSound = () => {
  return useContext(SoundContext);
};

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState({});
  const [musicFiles, setMusicFiles] = useState();

  const HandleSetMusic = (data) => {
    setMusic(data);
  };

  const onPlaybackStatusUpdate = () => {};

  return (
    <SoundContext.Provider value={sound}>
      <MusicContext.Provider value={music}>
        <MusicUpdateContext.Provider value={HandleSetMusic}>
          {children}
        </MusicUpdateContext.Provider>
      </MusicContext.Provider>
    </SoundContext.Provider>
  );
};
