import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/user/google`, data);
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUsers = createAsyncThunk(
  "auth/getusers",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/user/getallusers/${id}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  user: "",
  users: [],
  currentUser: null,
  isError: "",
  isLoading: false,
  isBlockedbyMe: false,
  isBlockedbyHim: false,
  number: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      state.users = [];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsBlockedbyMe: (state, action) => {
      state.isBlockedbyMe = action.payload;
    },
    setIsBlockedbyHim: (state, action) => {
      state.isBlockedbyHim = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      });
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;

        state.isError = action.payload.message;
      });
  },
});

export const {
  setUser,
  logout,
  setCurrentUser,
  setIsBlockedbyHim,
  setIsBlockedbyMe,
  setNumber,
} = authSlice.actions;
export default authSlice.reducer;
