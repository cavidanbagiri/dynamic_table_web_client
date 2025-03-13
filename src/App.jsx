
import { useState } from 'react'

// import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

import { RouterProvider } from 'react-router-dom'

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {setIsAuthTrue} from './store/login_register_store'

import './App.css'

import router from './router/index.jsx'
import UserService from './service/UserService.js';
import TableService from './service/TableService.js';



function App() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
        try {
            // Decode the access token to check its expiration
            const decodedToken = jwtDecode(accessToken);
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            console.log('Token expiry check:', {
                expirationTime,
                currentTime,
                timeRemaining: expirationTime - currentTime,
            });

            // Check if the token is about to expire (within 285 seconds)
            if (expirationTime - currentTime < 10000) {
                // Refresh the token
                dispatch(UserService.refresh())
                    .then((result) => {
                        if (UserService.refresh.fulfilled.match(result)) {
                            console.log('Token refreshed successfully:', result.payload);
                            dispatch(setIsAuthTrue()); // Update authentication state
                        } else {
                            console.error('Failed to refresh token:', result.payload);
                        }
                    })
                    .catch((error) => {
                        console.error('Error refreshing token:', error);
                    });
            } else {
                // Token is still valid, update authentication state
                dispatch(setIsAuthTrue());
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            // Handle invalid tokens (e.g., clear localStorage and redirect to login)
            localStorage.removeItem('token');
        }
    }
}, [dispatch]); // Add dispatch as a dep



  // useEffect(()=>{
  //   if(is_auth === false){

  //       dispatch(UserService.refresh());

  //   }
  //   else{
  //     dispatch(TableService.fetchFavoriteTables());
  //     dispatch(TableService.fetchMyTables());
  //   }
  // },
  // [is_auth]
  // );

  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
