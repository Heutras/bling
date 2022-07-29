import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:5000/posts';


const initialState = {posts: []};

export const fetchPosts = createAsyncThunk('posts/requestStatus',async () => {
    const res = await axios.get(url);
    return res.data;
})

export const createPost = createAsyncThunk('post/createStatus',async (newPost) => {
    const res = await axios.post('/create',newPost);
    return res.data;
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
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
        builder.addCase(createPost.pending, (state) => {
            console.log("create bekliyo")
          state.loading = true;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            console.log("create oldu", state.posts)
            console.log("actioan.payload", action.payload)

            state.loading = false;
            state.posts = [ ...state.posts ,action.payload];
            state.error = '';
        })
        builder.addCase(createPost.rejected, (state, action) => {
            console.log("state posts bu",state.posts)
            console.log("action da bu",action.payload)
            console.log("create olmadi")
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
      },
})

export default postSlice.reducer;