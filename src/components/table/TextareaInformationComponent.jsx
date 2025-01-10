
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { CiViewTable } from "react-icons/ci";

import TableService from "../../service/TableService";

function TextareaInformationComponent() {

  const dispatch = useDispatch();

  const fetch_table = useSelector(state => state.tableSlice.fetch_table);
  const favorite_tables = useSelector(state => state.tableSlice.favorite_tables);

  const textareaStyle = {
    width: 'calc(100% - 410px)',
  };

  return (
    <div className="flex flex-row h-96">

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
            <span key={index} onClick={() => {
              dispatch(TableService.fetchTableByName(table.original_table_name));
            }} 
            className="py-1 flex flex-row items-center rounded-md hover:bg-gray-100 cursor-pointer">
              <CiViewTable/>
              <span className="text-xs ml-2 ">
              {table.table_name}
              </span>
            </span>
          ))
        }
      </div>

      <textarea
        style={{ fontFamily: "JetBrains Mono", ...textareaStyle }}
        className=" w-full rounded-md p-2 border border-gray-300 my-2 outline-gray-400 text-sm"
      ></textarea>
    </div>
  );
}

export default TextareaInformationComponent;
