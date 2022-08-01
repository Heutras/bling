import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUserData: (state, action) => {
            state.user = action.payload
        },
        signIn: (state, action) => {
            state.user = action.payload.user
            localStorage.setItem('profile', JSON.stringify(action.payload.user))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        signOut: (state) => {
            state.user =  null
            localStorage.clear();
        },
    },
    extraReducers: () => {},
})

export const { signIn, signOut, setUserData } = authSlice.actions;
export default authSlice.reducer;