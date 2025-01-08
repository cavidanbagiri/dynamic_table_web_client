
import React from 'react'
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import TableService from '../service/TableService';

function Table() {

  const { tablename } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if(tablename){
      console.log(tablename);
      dispatch(TableService.fetchTableByName(tablename));
    }
    else{
      console.log('no table name');
    }
  }, []);

  return (
    <div className='w-screen h-screen bg-green-500'>
        {tablename}
    </div>
  )
}

export default Table
