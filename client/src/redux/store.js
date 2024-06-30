import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./features/messageSlice.js";
import authReducer from "./features/authSlice.js";
import socketReducer from "./features/socketSlice.js";
export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    socket: socketReducer,
  },
});
