import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LangSlice {
  mode: 'fa' | 'en'
}

const initialState: LangSlice = {
  mode: 'en'
}

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<'fa' | 'en'>) => {
      state.mode = action.payload;
    }
  }
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;