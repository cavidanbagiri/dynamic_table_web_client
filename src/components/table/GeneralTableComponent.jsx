
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
    const my_tables = useSelector(state => state.tableSlice.my_tables);



    return (
        <div className='flex flex-col'>

            <div className='flex flex-row h-96 '>

                <div className="flex flex-col text-start w-48  p-2 m-2 border border-gray-300 rounded-md">

                    {/* <span className="text-xs text-gray-500 text-center">Favorites</span>

                    <div className="flex flex-col justify-start items-start my-2 ">

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
                    </div> */}

                    <span className="text-sm text-gray-500 text-center font-medium">My tables</span>

                    <div className="flex flex-col justify-start items-start my-1 h-48 overflow-auto">

                        {
                            my_tables.map((table, index) => (
                                <span key={index}
                                    onClick={() => {
                                        navigate(`/table/${table.original_table_name}`);
                                        dispatch(TableService.fetchTableByName(table.original_table_name));
                                    }}
                                    className="p-1 mt-1 flex flex-row items-center border rounded-md bg-green-500 text-white hover:bg-green-400 duration-300 cursor-pointer">
                                    <CiViewTable />
                                    <span className="text-xs px-2 ">
                                        {table.table_name}
                                    </span>
                                </span>
                            ))
                        }

                    </div>




                    <span className="text-sm text-gray-500 text-center font-medium">Favorites</span>

                    <div className="flex flex-col justify-start items-start my-1 h-48 overflow-auto">

                        {
                            favorite_tables.map((table, index) => (
                                <span key={index}
                                    onClick={() => {
                                        navigate(`/table/${table.original_table_name}`);
                                        dispatch(TableService.fetchTableByName(table.original_table_name));
                                    }}
                                    className="p-1 mt-1 flex flex-row items-center border rounded-md bg-green-500 text-white hover:bg-green-400 duration-300 cursor-pointer">
                                    <CiViewTable />
                                    <span className="text-xs px-2 ">
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