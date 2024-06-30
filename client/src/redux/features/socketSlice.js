// redux/features/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // initializeSocket: (state) => {
    //   state.socket = io("ws://localhost:8900");
    //   state.isConnected = true;
    // },
    // disconnectSocket: (state) => {
    //   if (state.socket) {
    //     state.socket.disconnect();
    //     state.socket = null;
    //     state.isConnected = false;
    //   }
    // },
  },
});

export const { initializeSocket, disconnectSocket } = socketSlice.actions;

export const selectSocket = (state) => state.socket.socket;
export const selectIsConnected = (state) => state.socket.isConnected;

export default socketSlice.reducer;
