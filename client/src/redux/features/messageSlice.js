import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
export const getConversations = createAsyncThunk(
  "conversations/get",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/conversation/get/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/get",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/message/get/${senderId}/${receiverId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "messages/send",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/message/create`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  messages: [],
  conversations: [],
  friend: {},
  conversationId: "",
  isError: "",
  isLoading: false,
  sendMessages: null,
  recievedMessage: null,
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setMessageinRedux: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setSendMessage: (state, action) => {
      state.sendMessages = action.payload;
    },
    clearMessages: (state, action) => {
      state.messages = [];
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id != action.payload
      );
    },
    setRecievedMessage: (state, action) => {
      state.recievedMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      });

    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "";
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
        state.messages = [];
      });
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = "";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      });
  },
});
export default messageSlice.reducer;
export const {
  setConversationId,
  setMessageinRedux,
  setSendMessage,
  clearMessages,
  deleteMessage,
  setRecievedMessage,
} = messageSlice.actions;
