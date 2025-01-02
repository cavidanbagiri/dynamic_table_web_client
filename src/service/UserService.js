

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import $api, { API_URL } from "../http/index.js";

class UserService {

    // Checked
    static userLogin = createAsyncThunk(
        'user/login',
        async (user_data) => {
            let data = {};
            await $api.post('/user/login', user_data)
                .then((response) => {
                    data.data = response.data;
                    data.status = response.status;
                }).catch((err)=>{
                    data.data = err.response.data;
                    data.status = err.response.status;
                })
            return data;
        }
    );

    // Checked
    static refresh = createAsyncThunk(
        'user/refresh',
        async () => {
            let data = {};
            await $api.get('/user/refresh')
                .then((response) => {
                    data.data = response.data.user;
                    data.status = response.status;
                }).catch((err)=>{
                    data = null;
                })
            return data;
        }
    );

    // Checked
    static userLogout (){
        localStorage.clear();
    }

    // Working
    static userRegister = createAsyncThunk(
        'users/register',
        async (user_data) => {
            let data = null;
            await $api.post('/users/register', user_data)
                .then((response) => {
                    data = response.data;
                }).catch((err)=>{
                    data = null;
                })
            return data;
        }
    );

}

export default UserService;