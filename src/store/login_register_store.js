
import { createSlice } from '@reduxjs/toolkit'

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

    registration_message: '',
    registration_pending: false,
    is_registration_error: -1,

    refreshPending: false,
    refreshError: null,

}

export const loginRegisterSlice = createSlice({
    name: 'loginRegister',
    initialState,
    reducers: {

        setLoginErrorInitial: (state) => {
            state.is_login_error = -1
        },

        setRegisterErrorInitial: (state) => {
            state.is_registration_error = -1
        },

        setIsAuthTrue: (state, action) => {
            state.is_auth = true
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


        //..............................................................................................User Register
        builder.addCase(UserService.userRegister.pending, (state) => {
            state.registration_pending = true;
        });

        builder.addCase(UserService.userRegister.fulfilled, (state, action) => {
            state.registration_pending = false;
            state.registration_message = 'User registered successfully';
            state.is_registration_error = 1; // No error
            state.user = action.payload; // Store user data if needed
        });

        builder.addCase(UserService.userRegister.rejected, (state, action) => {
            console.log('user register rejected', action);
            state.registration_pending = false;
            state.registration_message = action.payload?.detail || 'Registration failed';
            state.is_registration_error = 0; // Indicate error
        });





        //..............................................................................................User Login
        // Handle pending state
        builder.addCase(UserService.userLogin.pending, (state) => {
            state.login_pending = true;
        });

        // Handle fulfilled state
        builder.addCase(UserService.userLogin.fulfilled, (state, action) => {
            state.login_pending = false;

            const user = action.payload.user;

            // Capitalize the first letter of each word in fullname
            // const capitalizedFullname = user.fullname
            // .split(' ')
            // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            // .join(' ');

            state.user = user;
            state.is_auth = true;
            state.login_message = 'User logged in successfully';

            // Store user data in localStorage (avoid storing tokens here)
            localStorage.setItem('id', user.id);
            localStorage.setItem('token', action.payload.access_token);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('profile_image', user.profile_image);
            // localStorage.setItem('fullname', capitalizedFullname);

            state.is_login_error = 1;
        });


        // Handle rejected state
        builder.addCase(UserService.userLogin.rejected, (state, action) => {
            console.log('some in here');
            state.is_auth = false;
            state.login_pending = false;
            state.login_message = action.payload?.message || 'Login failed';
            state.is_login_error = 0;
        });


        //..............................................................................................User Refresh

        // Handle pending state
        builder.addCase(UserService.refresh.pending, (state) => {
            state.refreshPending = true;
            state.refreshError = null;
        });

        // Handle fulfilled state
        builder.addCase(UserService.refresh.fulfilled, (state, action) => {
            console.log('object fullfilled ', action.payload);
            state.is_auth = true;
            state.refreshPending = false;
            state.user = action.payload.user;
            state.refreshError = null;
            localStorage.setItem('token', action.payload.access_token);
        });

        // Handle rejected state
        builder.addCase(UserService.refresh.rejected, (state, action) => {
            console.log('object reject ', action.payload);
            state.is_auth = true;
            state.refreshPending = false;
            state.refreshError = action.payload || 'Failed to refresh token';
        });


        // Redux slice
        builder.addCase(UserService.userLogout.fulfilled, (state, action) => {
            state.is_auth = false;
            state.user = {
                email: 'unknown',
                username: '',
                profile_image: '',
            };
            localStorage.clear(); // Clear localStorage
        });

        builder.addCase(UserService.userLogout.rejected, (state, action) => {
            // Optionally handle the error (e.g., show a notification)
        });


    }
})


export const { setLoginErrorInitial, setRegisterErrorInitial, userLogout, setIsAuthTrue } = loginRegisterSlice.actions


export default loginRegisterSlice.reducer;