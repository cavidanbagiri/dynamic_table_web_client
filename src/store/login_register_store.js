
import {createSlice} from '@reduxjs/toolkit'

import axios from 'axios';
axios.defaults.withCredentials = true;

import UserService from '../service/UserService.js'

const initialState = {
    is_auth: false,
    user: {
        email: 'unknown',
        username: '',
        profile_image: '',
    },
    login_message: '',
    login_pending: false,
    is_login_error: -1,
}

export const loginRegisterSlice = createSlice({
    name: 'loginRegister',
    initialState,
    reducers: {

        setLoginErrorInitial: (state) => {
            state.is_login_error = -1
        },

        userLogout: (state) => {
            state.is_auth = false;
            state.user = {
                email: 'unknown',
                username: '',
                profile_image: '',
            };
            localStorage.clear();
        }

    },
    extraReducers: (builder) => {


        //..............................................................................................User Login
        // Checked
        builder.addCase(UserService.userLogin.pending, (state, action) => {
            state.login_pending = true;
        })
        // Checked
        builder.addCase(UserService.userLogin.fulfilled, (state, action) => {
            state.login_pending = false;
            if (action.payload.status == 200) {
                state.user = action.payload.data.user;
                state.is_auth = true;
                state.login_message = 'User logged in successfully';
                localStorage.setItem('token', action.payload.data.access_token);
                localStorage.setItem('id', action.payload.data.user.id);
                localStorage.setItem('username', action.payload.data.user.username);
                localStorage.setItem('email', action.payload.data.user.email);
                localStorage.setItem('profile_image', action.payload.data.user.profileImage);
                state.is_login_error = 1;
            }
            else {
                state.is_auth = false;
                state.login_message = action.payload.data.message;
                state.is_login_error = 0;
            }
        })


        //..............................................................................................User refresh
        // Checked
        builder.addCase(UserService.refresh.fulfilled, (state, action) => {
            if(action.payload?.status == 200){
                state.is_auth = true
                state.user = action.payload.data.user
            }
            else{
                state.is_auth = false
                state.user = null
            }
        })


        //..............................................................................................User Refresh
        // Checked
        builder.addCase(UserService.userRegister.pending, (state, action) => {
            state.login_pending = true;
        })
        builder.addCase(UserService.userRegister.fulfilled, (state, action) => {
            state.login_pending = false;
            if (action.payload.status == 201) {
                state.login_message = 'User registered successfully';
                state.is_login_error = 1;
            }
            else {
                state.login_message = action.payload.data.message;
                state.is_login_error = 0;
            }
        })

    }
})


export const {setLoginErrorInitial, userLogout} = loginRegisterSlice.actions


export default loginRegisterSlice.reducer;