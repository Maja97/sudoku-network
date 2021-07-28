import { authReducer } from "./auth/authRedux";
import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "./notification/notificationRedux";
import { loadingReducer } from "./loading/loadingRedux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
