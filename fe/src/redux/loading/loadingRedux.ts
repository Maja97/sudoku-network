import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  [key: string]: string;
}
const initialState: LoadingState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state[action.payload] = action.payload;
    },
    stopLoading: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
