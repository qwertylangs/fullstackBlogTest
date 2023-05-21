import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fethAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "idle";
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "received";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "received";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
    },

    [fetchRegister.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "received";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default authSlice.reducer;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;
