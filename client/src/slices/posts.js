import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:5000/posts';


const initialState = {
    posts: []
};

export const fetchPosts = createAsyncThunk('posts/requestStatus',async () => {
    const res = await axios.get(url);
    return res.data;
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        createPost: (state, action) => {
            state.posts.push(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload );
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        },
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

export const { createPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;