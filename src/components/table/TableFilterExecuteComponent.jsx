
import React, {useEffect, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@mui/material/CircularProgress';
import { IoMdPlay } from "react-icons/io";

import { IoFilterOutline } from "react-icons/io5";

import { clearFilterHeaderQuery } from '../../store/table_store'

import TableService from '../../service/TableService';

import TableHeadersDropdownComponent from './TableHeadersDropdownComponent';


function TableFilterExecuteComponent() {

  const dispatch = useDispatch();

  const fetch_table = useSelector((state) => state.tableSlice.fetch_table);

  const [show_headers, setShowHeaders] = useState(false);


  return (
    <div className='flex flex-row justify-between items-end p-2 '>

      <div className='flex flex-row justify-start  items-end'>

        <div className='mx-2 flex flex-row'>
          {
            !fetch_table.pending && !fetch_table.table_information.filter_information.pending
              ?
              <button
                onClick={() => {
                  dispatch(TableService.filterTableByHeaders({ table_name: fetch_table.table_information.original_table_name, query: fetch_table.filter_header_query }));
                }}
                className='flex flex-row items-center py-1 px-2 border rounded-sm text-md text-gray-700 border-gray-300 hover:bg-gray-100'>
                <IoMdPlay className='text-lg mr-3' />
                Execute
              </button>
              :
              <button
                className='flex flex-row items-center py-1 px-2 border rounded-sm text-md text-gray-700 border-gray-300 hover:bg-gray-100'>
                <CircularProgress size={20} />
                <span className='ml-2'>Executing</span>
              </button>

          }
        </div>

        <div className='mx-2 text-sm' style={{ fontFamily: 'JetBrains Mono' }}>
          <span className='ml-2'>

            {
              fetch_table.pending ? null
                :

                fetch_table.table_information.filter_information.pending
                  ?
                  <span className='font-bold text-yellow-500'>Pending Operation</span>
                  :
                  fetch_table.table_information.filter_information.error_status == 1 ?
                    <>
                      <span className='font-bold text-green-500'>Completed Operation : </span>
                      <span className='ml-2'>Query Time: {fetch_table.table_information.filter_information.execution_time}ms/</span>
                      <span className='ml-2'>Total Rows: {fetch_table.table_information.filter_information.total_rows}/</span>
                    </>
                    :
                    <>
                      <span className='font-bold text-red-500'>Wrong Operation : </span>
                      <span className='ml-2'>Query Time: {fetch_table.table_information.filter_information.execution_time}ms/</span>
                      <span className='ml-2'>Total Rows: {fetch_table.table_information.filter_information.total_rows}/</span>
                    </>
            }

            <span className='ml-2 cursor-pointer text-black text-xs font-bold underline hover:text-indigo-600'
              onClick={() => {
                dispatch(clearFilterHeaderQuery());
                dispatch(TableService.fetchTableByName(fetch_table.table_information.original_table_name));
              }}>
              reload
            </span>

          </span>
        </div>

      </div>


      {/* Headers Section */}
      <div className='mr-6 relative'>
        <button onClick={() => setShowHeaders(!show_headers)}
        className='flex flex-row items-center py-1 px-2 border rounded-sm text-md text-gray-700 border-gray-300 hover:bg-gray-100 '>
          <IoFilterOutline className='text-lg mr-3' /> Headers
        </button>
        {
          show_headers && <TableHeadersDropdownComponent />
        }
      </div>

    </div>
  )
}

export default TableFilterExecuteComponent