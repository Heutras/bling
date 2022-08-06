import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const url = 'http://localhost:5000/posts';

const initialState = {
    posts: [],
    post:null,
    currentPage: 1,
    numberOfPages: 1,
    loading:false,
    error:''
};

export const fetchPosts = createAsyncThunk('posts/requestStatus',async (page) => {
    const { data } = await axios.get(`${url}?page=${page}`);
    return data;
})
export const fetchPost = createAsyncThunk('post/requestStatus',async (id) => {
    const { data } = await axios.get(`${url}/${id}`);
    return data;
})
export const fetchPostsBySearch = createAsyncThunk('postsBySearch/requestStatus',async (searchQuery) => {
    const { data } = await axios.get(`${url}/search?searchQuery=${searchQuery.search.split(' ').join(',') || 'none'}&tags=${searchQuery.tags}`);
    return data.data;
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
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage
            state.numberOfPages = action.payload.numberOfPages
            state.error = '';
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
        builder.addCase(fetchPost.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = '';
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.post = {};
            state.error = action.error.message;
        })
        builder.addCase(fetchPostsBySearch.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(fetchPostsBySearch.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = '';
        })
        builder.addCase(fetchPostsBySearch.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
      },
})

export const { createPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;