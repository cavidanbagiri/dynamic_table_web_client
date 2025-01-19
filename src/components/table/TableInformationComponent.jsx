
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CiViewTable } from "react-icons/ci";

import TableService from "../../service/TableService";

import MessageBox from "../common/MessageBox";
import CodeEditor from "./CodeEditor";
import {setFilterSQLQueryStatusInitial, setFilterSQLQueryResultStatusInitial} from '../../store/table_store'

function TableInformationComponent() {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const fetch_table = useSelector(state => state.tableSlice.fetch_table);
  const favorite_tables = useSelector(state => state.tableSlice.favorite_tables);

  useEffect(() => {
    if(fetch_table.table_information.filter_information.error_status == 0){
      setTimeout(() => {
        dispatch(setFilterSQLQueryStatusInitial());
      }, 3000)
    }
  }, [fetch_table]);

  useEffect(() => {
    if(fetch_table.table_information.result_information.status == 1){
      setTimeout(() => {
        dispatch(setFilterSQLQueryResultStatusInitial());
      }, 3000)
    }
  }, [fetch_table]);

  return (
    <div className="flex flex-row h-96">

      {
        fetch_table.table_information.filter_information.error_status == 0 &&
        <MessageBox message={fetch_table.table_information.filter_information.error_message} color={'bg-red-500'} />
      }

      {
        fetch_table.table_information.result_information.status == 1 &&
        <MessageBox message={
          'Affected rows: ' +
          fetch_table.table_information.filter_information.total_rows +
          ' | Execution time: ' +
          fetch_table.table_information.filter_information.execution_time + 'ms'
        } color={'bg-green-500'} />
      }

      <div className="flex flex-col text-start w-96 p-2 m-2 border border-gray-300 rounded-md">
        <span className="text-md text-gray-500 text-center">Information</span>
        {
          fetch_table.table_information && (
            <div className="flex flex-col text-sm text-gray-500 ">
              <span className="my-1">Total Rows: {fetch_table.table_information.total_rows}</span>
              <span className="my-1">Total Columns: {fetch_table.table_information.total_columns}</span>
              <span className="my-1">Total Size: {fetch_table.table_information.table_size}</span>
            </div>
          )
        }
        <span className="text-md text-gray-500 text-center">Favorites</span>
        {
          favorite_tables.map((table, index) => (
            <span key={index} 
            onClick={() => {
              navigate(`/table/${table.original_table_name}`);
              dispatch(TableService.fetchTableByName(table.original_table_name));
            }}
              className="py-1 flex flex-row items-center rounded-md hover:bg-gray-100 cursor-pointer">
              <CiViewTable />
              <span className="text-xs ml-2 ">
                {table.table_name}
              </span>
            </span>
          ))
        }
      </div>

    
      <CodeEditor />
      
    </div>
  );
}

export default TableInformationComponent;
