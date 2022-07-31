import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth";
import postSlice from '../slices/posts';

export const store = configureStore({
    reducer: {
        posts: postSlice,
        auth: authSlice,
    }
});