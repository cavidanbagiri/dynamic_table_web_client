
import React from 'react'
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import TableService from '../service/TableService';
import TableHeaderComponent from '../components/table/TableHeaderComponent';
import TableBodyComponent from '../components/table/TableBodyComponent';

function Table() {

  const { tablename } = useParams();

  const dispatch = useDispatch();

  const table_info = useSelector((state) => state.tableSlice.table_info);

  useEffect(() => {
    if(tablename){
      dispatch(TableService.fetchTableByName(tablename));
    }
  }, []);

  return (
    <div className='flex flex-col'>
        {
            tablename && table_info?
            <table className='w-full'>
              <TableHeaderComponent table_info={table_info} />
              <TableBodyComponent table_info={table_info} />
            </table>
            :null
        }
    </div>
  )
}

export default Table
