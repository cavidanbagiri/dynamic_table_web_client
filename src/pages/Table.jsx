
import React from 'react'
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import TableService from '../service/TableService';
import TableHeaderComponent from '../components/table/TableHeaderComponent';
import TableBodyComponent from '../components/table/TableBodyComponent';
import TableFilterExecuteComponent from '../components/table/TableFilterExecuteComponent';
import TableInformationComponent from '../components/table/TableInformationComponent';
import TableSkeleton from '../components/common/TableSkeleton';
import GeneralTableComponent from '../components/table/GeneralTableComponent';
import TableResultInformationComponent from '../components/table/TableResultInformationComponent'
import MyFolderComponent from '../components/common/MyFolderComponent';

function MainTable() {

  const { tablename } = useParams();

  const dispatch = useDispatch();

  // const fetch_table = useSelector((state) => state.tableSlice.fetch_table);

  useEffect(() => {
    if (tablename) {
      dispatch(TableService.fetchTableByName(tablename));
    }
  }, [tablename]);


  return (
      <div className='flex flex-col relative'>
        <MyFolderComponent />
        {
          tablename ?
            <>

              <TableInformationComponent />
              <TableFilterExecuteComponent />
              <TableResultInformationComponent />

            </>
            :
            <GeneralTableComponent />
        }
      </div>
  )
}

export default MainTable
