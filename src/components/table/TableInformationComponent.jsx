
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CiViewTable } from "react-icons/ci";

import TableService from "../../service/TableService";

import MessageBox from "../common/MessageBox";
import CodeEditor from "./CodeEditor";
import { setFilterSQLQueryStatusInitial, setFilterSQLQueryResultStatusInitial } from '../../store/table_store'

function TableInformationComponent() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetch_table = useSelector(state => state.tableSlice.fetch_table);
  const favorite_tables = useSelector(state => state.tableSlice.favorite_tables);
  const my_tables = useSelector(state => state.tableSlice.my_tables);

  useEffect(() => {
    if (fetch_table.table_information.filter_information.error_status == 0) {
      setTimeout(() => {
        dispatch(setFilterSQLQueryStatusInitial());
      }, 6000)
    }
  }, [fetch_table]);

  useEffect(() => {
    if (fetch_table.table_information.result_information.status == 1) {
      setTimeout(() => {
        dispatch(setFilterSQLQueryResultStatusInitial());
      }, 6000)
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

      

      <CodeEditor />

    </div>
  );
}

export default TableInformationComponent;
