
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { IoMdPlay } from "react-icons/io";

import TableService from '../../service/TableService';

function TableFilterExecuteComponent() {

  const dispatch = useDispatch();

  const fetch_table = useSelector((state) => state.tableSlice.fetch_table);
  

  return (
    <div className='flex flex-row justify-start items-end p-2 '>

      <div className='mx-2'>
        <button
          onClick={() => {
            dispatch(TableService.filterTableByHeaders({table_name:fetch_table.table_information.original_table_name, query:fetch_table.filter_header_query}));
          }}
          className='flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md'>
          <IoMdPlay className='text-sm ' /> Execute
        </button>
      </div>
      
      <div className='mx-2 font-thin text-xs'  style={{fontFamily: 'JetBrains Mono'}}>
        <span className='ml-2'>Total Rows: {fetch_table.table_information.filter_information.total_rows}/</span>
        <span className='ml-2'>Query Time: {fetch_table.table_information.filter_information.execution_time}ms/</span>
      </div>

    </div>
  )
}

export default TableFilterExecuteComponent