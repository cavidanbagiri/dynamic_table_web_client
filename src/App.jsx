
import { useState } from 'react'

import {RouterProvider} from 'react-router-dom'

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './App.css'

import router from './router/index.jsx'
import UserService from './service/UserService.js';



function App() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

  useEffect(()=>{
    if(is_auth === false){
      dispatch(UserService.refresh());
    }
    if(is_auth){
        console.log('use effect work for is auth in navbar');
    }
  },
);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
