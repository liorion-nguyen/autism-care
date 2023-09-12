import { createSlice } from "@reduxjs/toolkit";

type NotificationState = {
  isNoti: boolean;
};

const initialState: NotificationState = {
  isNoti: false,
};

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setNoti: (state) => {
      state.isNoti = true;
    },
    removeNoti: (state) => {
      state.isNoti = false;
    },
  },
});

export const setNoti = notiSlice.actions.setNoti;
export const removeNoti = notiSlice.actions.removeNoti;
export const notiReducer = notiSlice.reducer;
