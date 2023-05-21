import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/posts";
import auth from "./slices/auth";

const store = configureStore({
  reducer: { posts, auth },
});

export default store;
