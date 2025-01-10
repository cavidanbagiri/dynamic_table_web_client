
import React from 'react'
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import TableService from '../service/TableService';
import TableHeaderComponent from '../components/table/TableHeaderComponent';
import TableBodyComponent from '../components/table/TableBodyComponent';
import TableFilterExecuteComponent from '../components/table/TableFilterExecuteComponent';
import TextareaInformationComponent from '../components/table/TextareaInformationComponent';

function Table() {

  const { tablename } = useParams();

  const dispatch = useDispatch();

  const fetch_table = useSelector((state) => state.tableSlice.fetch_table);

  useEffect(() => {
    if (tablename) {
      dispatch(TableService.fetchTableByName(tablename));
    }
  }, []);

  



  return (
    <div className='flex flex-col '>
      {
        tablename && fetch_table.table_info ?
          <>
            <TextareaInformationComponent />
            <TableFilterExecuteComponent />
            <span className='text-start text-2xl font-medium mt-4'>Table Result</span>
            <table className='w-full'>
              <TableHeaderComponent />
              <TableBodyComponent />
            </table>
          </>
          : null
      }
    </div>
  )
}

export default Table
