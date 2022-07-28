import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:5000/posts';

const initialState = {
    posts: []
}
export const fetchPosts = createAsyncThunk('posts/requestStatus',() => {
    return axios.get(url).then(res => res.data)
})
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        createPost: (state, action) => {
            state.posts = [...state.posts, action.payload]
        },
        updatePost:(state, action) => {
            state.posts = state.posts.map((post)=> post._id === action.payload ? action.payload : post);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = '';
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
      },
})

export const { setPosts, createPost } = postSlice.actions;
export default postSlice.reducer;