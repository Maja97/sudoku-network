import { createSlice } from "@reduxjs/toolkit";
import colors from "../../constants/colors";

export interface NotificationInterface {
  message: string;
  color: string;
  backgroundColor: string;
}

interface NotificationState {
  notification: NotificationInterface;
  shown: boolean;
}

const initialState: NotificationState = {
  notification: {
    message: "",
    color: colors.white,
    backgroundColor: colors.black,
  },
  shown: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notification = action.payload;
      state.shown = true;
    },
    hideNotification: (state) => {
      state.shown = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
