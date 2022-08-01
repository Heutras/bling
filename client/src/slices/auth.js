import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/index.js';
const initialState = {
    user: null
};
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
        signIn: (state, action) => {
            api.signIn(action.payload)
            .then((res) => {
                console.log('iste res',res)
                const { data} = res
                state.user = data.result
                localStorage.setItem('token', JSON.stringify(data.token))
                localStorage.setItem('profile', JSON.stringify(data.result))
            })
            .catch( (err) => console.log(err))
        },
        signUp: (state, action) => {
            api.signUp(action.payload)
            .then((res) => {
                const { data } = res
                state.user = data.result
                localStorage.setItem('token', JSON.stringify(data.token))
                localStorage.setItem('profile', JSON.stringify(data.result))
            })
            .catch((err)=> console.log(err))
        },
        signOut: (state) => {
            state.user =  null
            localStorage.clear();
        },
    },
    extraReducers: () => {},
})

export const { signIn, auth , signOut, signUp, setAuth } = authSlice.actions;
export default authSlice.reducer;