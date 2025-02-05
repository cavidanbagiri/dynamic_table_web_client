
import { useState } from 'react'

import {RouterProvider} from 'react-router-dom'

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './App.css'

import router from './router/index.jsx'
import UserService from './service/UserService.js';
import { Tab } from '@mui/material';
import TableService from './service/TableService.js';



function App() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

  useEffect(()=>{
    if(is_auth === false){
      dispatch(UserService.refresh());
    }
    else{
      dispatch(TableService.fetchFavoriteTables());
      dispatch(TableService.fetchMyTables());
    }
  },
  [is_auth]
  );


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
