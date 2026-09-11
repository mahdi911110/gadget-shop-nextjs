import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkSlice {
  mode: boolean
}

const initialState: DarkSlice = {
  mode: false
}

const darkSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    lightMode: (state) => {
      state.mode = false;
    },
    darkMode: (state) => {
      state.mode = true;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.mode = action.payload;
    }
  }
});

export const { lightMode, darkMode, setMode } = darkSlice.actions;
export default darkSlice.reducer;