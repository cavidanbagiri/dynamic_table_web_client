
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
    if (tablename) {
      dispatch(TableService.fetchTableByName(tablename));
    }
  }, []);

  const textareaStyle = {
    width: 'calc(100% - 20px)',
  };

  return (
    <div className='flex flex-col '>
      {
        tablename && table_info ?
          <>
            <textarea name="" id="" style={textareaStyle}
            className=' h-96 rounded-md p-2 border border-gray-300 my-2 outline-gray-400'>


            </textarea>
            <span className='text-start text-2xl font-medium'>Table Result</span>
            <table className='w-full'>
              <TableHeaderComponent table_info={table_info} />
              <TableBodyComponent table_info={table_info} />
            </table>
          </>
          : null
      }
    </div>
  )
}

export default Table
