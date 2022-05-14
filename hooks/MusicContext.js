import { useContext } from "react";
import { createContext, useState } from "react";

export const MusicContext = createContext();
export const MusicUpdateContext = createContext();
export const MusicFilesContext = createContext();
export const SetMusicFilesContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const useMusicUpate = () => {
  return useContext(MusicUpdateContext);
};

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState({});
  const [musicFiles, setMusicFiles] = useState();

  const HandleSetMusic = (data) => {
    setMusic(data);
  };

  const HandleSetFiles = (data) => {
    setMucicFiles(data);
  };
  return (
    <SetMusicFilesContext.Provider value={setMusicFiles}>
      <MusicFilesContext.Provider value={musicFiles}>
        <MusicContext.Provider value={music}>
          <MusicUpdateContext.Provider value={HandleSetMusic}>
            {children}
          </MusicUpdateContext.Provider>
        </MusicContext.Provider>
      </MusicFilesContext.Provider>
    </SetMusicFilesContext.Provider>
  );
};
