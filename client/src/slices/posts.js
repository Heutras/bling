import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        createPost: (state, action) => {
            state.posts.push(action.payload);
        }
    }
})

export const { setPosts, createPost } = postSlice.actions;
export default postSlice.reducer;