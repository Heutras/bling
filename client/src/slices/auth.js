import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/'})


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
  
    return req;
});

const initialState = {
    user: null
};


export const signIn = createAsyncThunk('user/signInStatus',async (formData) => {
    const res = await API.post('/user/signin', formData);
    return res.data;
})

export const signUp = createAsyncThunk('user/signUpStatus',async (formData) => {
    const res = await API.post('/user/signup', formData);
    return res.data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuth: (state, action) => {
            state.user = action.payload
        },
        auth: (state, action) => {
            state.user = action.payload.user
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            localStorage.setItem('profile', JSON.stringify(action.payload.user))
        },
        signOut: (state) => {
            state.user =  null
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log('bu ne',action.payload)
            state.user = action.payload.result
            state.loading = false;
            state.error = '';
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            localStorage.setItem('profile', JSON.stringify(action.payload.result))
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
        builder.addCase(signUp.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload.result
            state.loading = false;
            state.error = '';
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            localStorage.setItem('profile', JSON.stringify(action.payload.result))
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message;
        })
      },
})

export const { auth , signOut, setAuth } = authSlice.actions;
export default authSlice.reducer;