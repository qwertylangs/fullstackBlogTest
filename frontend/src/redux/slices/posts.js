import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get("/posts");
    return data;
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { posts } = getState();
  //     return posts.posts.status === "idle";
  //   },
  // }
);

export const fetchTags = createAsyncThunk(
  "posts/fetchTags",
  async () => {
    try {
      const { data } = await axios.get("/tags");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { posts } = getState();
  //     return posts.tags.status === "idle";
  //   },
  // }
);

const initialState = {
  posts: {
    items: [],
    status: "idle",
  },
  tags: {
    items: [],
    status: "idle",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost(state, action) {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "received";
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = "received";
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
    },
  },
});

export default postsSlice.reducer;

export const { removePost } = postsSlice.actions;
