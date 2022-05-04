import { configureStore } from "@reduxjs/toolkit";
import MusicReducer from "./reducers/musicreducer";
import InfoReducer from "./reducers/infoReducer";
import CurrentMusicReducer from "./reducers/currentMusicReducer";

const store = configureStore({
  reducer: {
    music: MusicReducer,
    info: InfoReducer,
    current: CurrentMusicReducer,
  },
});

export default store;
