import { CardActionArea } from "@material-ui/core";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        signIn: (state, action) => {
            console.log('act',action.payload)
            state.user = action.payload.user
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        signOut: (state) => {
            state.user =  null
            localStorage.clear();
        },

    },
    extraReducers: () => {},
})

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;