import { configureStore, createStore } from "@reduxjs/toolkit";
import MusicReducer from "./reducers/musicreducer";

const store = configureStore({ reducer: { music: MusicReducer } });

export default store;
