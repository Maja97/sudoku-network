import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationInterface {
  message: string;
  color: string;
  backgroundColor: string;
}

interface NotificationState {
  notification: NotificationInterface | undefined;
}

const initialState: NotificationState = {
  notification: undefined,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<NotificationInterface | undefined>
    ) => {
      state.notification = action.payload;
    },
    hideNotification: (state) => {
      state.notification = undefined;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
