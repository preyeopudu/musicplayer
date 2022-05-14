import { useContext } from "react";
import { createContext, useState } from "react";

export const MusicContext = createContext();
export const MusicUpdateContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const useMusicUpate = () => {
  return useContext(MusicUpdateContext);
};

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState({});

  const HandleSetMusic = (data) => {
    setMusic(data);
  };
  return (
    <MusicContext.Provider value={music}>
      <MusicUpdateContext.Provider value={HandleSetMusic}>
        {children}
      </MusicUpdateContext.Provider>
    </MusicContext.Provider>
  );
};
