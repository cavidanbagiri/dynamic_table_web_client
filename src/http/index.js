

import axios from 'axios';
import UserService from '../service/UserService';

export const API_URL = 'http://localhost:8000/api';

// import { store } from '../store';


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config)=>{
    config.headers.token = `Bearer ${localStorage.getItem('token')}`
    return config;
});



let isRefreshing = false;
let failedRequests = [];




$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('original request', originalRequest);

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Wait for the token refresh to complete
                return new Promise((resolve) => {
                    failedRequests.push(() => {
                        originalRequest.headers.token = `Bearer ${localStorage.getItem('token')}`;
                        resolve($api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Refresh the token
                const result = await axios.post(
                    `${API_URL}/user/refreshtoken`,
                    {}, // Empty body for POST requests
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            // Add other headers if required
                        },
                    }
                );

                // Check if the token refresh was successful
                if (result.status === 200) {
                    const newAccessToken = result.data.access_token;

                    // Update the token in localStorage
                    localStorage.setItem('token', newAccessToken);

                    // Retry failed requests
                    failedRequests.forEach((callback) => callback());
                    failedRequests = [];

                    // Retry the original request
                    originalRequest.headers.token = `Bearer ${newAccessToken}`;
                    return $api(originalRequest);
                } else {
                    console.log('Token refresh failed:', result.data);
                }
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // Redirect to login page or handle logout
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default $api;