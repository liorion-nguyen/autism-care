import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMeeting } from "../types/meeting";

type MeetingState = {
  meetingId: string | null;
};

const initialState: MeetingState = {
  meetingId: null,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setMeeting: (state, actions: PayloadAction<{ meetingId: string }>) => {
      state.meetingId = actions.payload.meetingId;
    },
    removeMeeting: (state) => {
      state.meetingId = null;
    },
  },
});

export const setMeeting = meetingSlice.actions.setMeeting;
export const removeMeeting = meetingSlice.actions.removeMeeting;
export const meetingReducer = meetingSlice.reducer;
