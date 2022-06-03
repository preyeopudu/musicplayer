import React, { useContext, createContext, useState } from "react";
const MusicListContext = createContext(undefined);
const MusicListsUpdateContext = createContext(undefined);
const CurrentSongContext = createContext();
const CurrentSongUpdateContext = createContext();
const PlayingContext = createContext();
const PlayingUpdateContext = createContext();

export const useMusicList = () => {
  return useContext(MusicListContext);
};

export const useMusicListUpdate = () => {
  return useContext(MusicListsUpdateContext);
};

export const useCurrent = () => {
  return useContext(CurrentSongContext);
};

export const useCurrentUpdate = () => {
  return useContext(CurrentSongUpdateContext);
};
export const usePlaying = () => {
  return useContext(PlayingContext);
};
export const usePlayingUpdate = () => {
  return useContext(PlayingUpdateContext);
};

export const AppProvider = ({ children }) => {
  const [musicList, setList] = useState();
  const [current, setCurrent] = useState();
  const [playing, setPlaying] = useState();

  const HandleCurrent = (data) => {
    setCurrent(data);
    console.log(data);
  };

  const HandleList = (data) => {
    setList(data);
  };

  const HandlePlaying = (data) => {
    setPlaying(data);
  };

  return (
    <MusicListContext.Provider value={musicList}>
      <MusicListsUpdateContext.Provider value={HandleList}>
        <CurrentSongUpdateContext.Provider value={HandleCurrent}>
          <CurrentSongContext.Provider value={current}>
            <PlayingContext.Provider value={playing}>
              <PlayingUpdateContext.Provider value={HandlePlaying}>
                {children}
              </PlayingUpdateContext.Provider>
            </PlayingContext.Provider>
          </CurrentSongContext.Provider>
        </CurrentSongUpdateContext.Provider>
      </MusicListsUpdateContext.Provider>
    </MusicListContext.Provider>
  );
};
