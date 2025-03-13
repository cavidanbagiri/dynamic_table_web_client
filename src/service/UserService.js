

import { createAsyncThunk } from "@reduxjs/toolkit";


import $api, { API_URL } from "../http/index.js";

class UserService {

    
    static userRegister = createAsyncThunk(
        'user/register',
        async (user_data, { rejectWithValue }) => {
            try {
                const response = await $api.post('/user/register', user_data);
                return response.data; // Return only the data you need
            } catch (err) {
                // Use rejectWithValue to propagate the error to the rejected action
                return rejectWithValue(err.response?.data || 'Registration failed');
            }
        }
    );



    static userLogin = createAsyncThunk(
        'user/login',
        async (user_data, { rejectWithValue }) => {
            try {
                const response = await $api.post('/user/login', user_data);
                return response.data; // Return only the data you need
            } catch (err) {
                console.log('coming err from server', err);
                // Use rejectWithValue to propagate the error to the rejected action
                return rejectWithValue(err.response?.data || 'Login failed');
            }
            }
    );

    
    static refresh = createAsyncThunk(
        'user/refreshtoken',
        async (_, { rejectWithValue }) => {
            try {
                const response = await $api.post('/user/refreshtoken');
                return response.data; // Return only the data you need
            } catch (err) {
                // Log the error for debugging
                console.error('Error refreshing token:', err.response?.data || err.message);
    
                // Propagate the error to the Redux slice
                return rejectWithValue(err.response?.data || 'Failed to refresh token');
            }
        }
    );



    static userLogout = createAsyncThunk(
        'user/logout',
        async (_, { rejectWithValue }) => {
            try {
                console.log('Logging out...');
                const response = await $api.get('/user/logout', {}, {
                    withCredentials: true, // Send cookies (refresh token)
                });
                console.log('Logout response:', response);
                return response.data; // Return only the data you need
            } catch (err) {
                console.log('object', err);
                // Log the error for debugging
                console.error('Error during logout:', err.response?.data || err.message);
    
                // Propagate the error to the Redux slice
                return rejectWithValue(err.response || 'Failed to logout');
            }
        }
    );



}

export default UserService;