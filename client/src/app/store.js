import { configureStore } from "@reduxjs/toolkit";
import postSlice from '../slices/posts';

export const store = configureStore({
    reducer: {
        posts: postSlice,
    }
});