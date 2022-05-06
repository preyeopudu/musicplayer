import { configureStore } from "@reduxjs/toolkit";
import MusicReducer from "./reducers/musicreducer";
import InfoReducer from "./reducers/infoReducer";
import CurrentMusicReducer from "./reducers/currentMusicReducer";
import ScreenReducer from "./reducers/ScreenReducer";

const store = configureStore({
  reducer: {
    music: MusicReducer,
    info: InfoReducer,
    current: CurrentMusicReducer,
    screen: ScreenReducer,
  },
});

export default store;
