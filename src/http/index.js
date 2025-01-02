

import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';




const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config)=>{
    // config.headers.Authorization = `Bearear ${localStorage.getItem('token')}`
    config.headers.token = `${localStorage.getItem('token')}`
    return config;
});

export default $api;