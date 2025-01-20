
import React, { useEffect } from 'react'


import { CiViewTable } from "react-icons/ci";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableService from '../../service/TableService';
import CodeEditor from './CodeEditor';
import PublicTablesComponent from '../home/PublicTablesComponent';



function GeneralTableComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);
    const favorite_tables = useSelector(state => state.tableSlice.favorite_tables);


    return (
        <div className='flex flex-col'>

            <div className='flex flex-row h-96 '>

                <div className="flex flex-col text-start w-96  p-2 m-2 border border-gray-300 rounded-md">
                    <span className="text-sm text-gray-500 text-center">Information</span>
                    {
                        fetch_table.table_information && (
                            <div className="flex flex-col text-xs text-gray-500 ">
                                <span className="">Total Rows: {fetch_table.table_information.total_rows}</span>
                                <span className="">Total Columns: {fetch_table.table_information.total_columns}</span>
                                <span className="">Total Size: {fetch_table.table_information.table_size}</span>
                            </div>
                        )
                    }
                    <span className="text-xs text-gray-500 text-center">Favorites</span>

                    <div className="flex flex-row justify-start items-center my-2 ">

                        {
                            favorite_tables.map((table, index) => (
                                <span key={index}
                                    onClick={() => {
                                        navigate(`/table/${table.original_table_name}`);
                                        dispatch(TableService.fetchTableByName(table.original_table_name));
                                    }}
                                    className="py-1 flex flex-row items-center rounded-md hover:bg-gray-100 cursor-pointer mx-1 border p-1">
                                    <CiViewTable />
                                    <span className="text-xs ml-2 ">
                                        {table.table_name}
                                    </span>
                                </span>
                            ))
                        }
                    </div>
                </div>

                <CodeEditor />

            </div>
                        

            <PublicTablesComponent />

        </div>
    )
}

export default GeneralTableComponent