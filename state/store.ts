import { configureStore } from "@reduxjs/toolkit";
import darkReducer from './slices/darkSlice';
import langReducer from './slices/langSlice';

export const store = configureStore({
  reducer: {
    dark: darkReducer,
    lang: langReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;