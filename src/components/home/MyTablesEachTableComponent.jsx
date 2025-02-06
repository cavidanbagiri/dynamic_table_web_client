import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaTable } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";


import TableService from '../../service/TableService';


function MyTablesEachTableComponent({ table, index }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [showIcon, setShowIcon] = React.useState(false)
    const [showTab, setShowTab] = React.useState(false)

    return (
        <div onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            onClick={() => {
                navigate(`/table/${table.original_table_name}`);
                dispatch(TableService.fetchTableByName(table.original_table_name));
            }}
            className='flex flex-col items-start p-2 mt-1 mr-2 rounded-md  hover:bg-gray-100 cursor-pointer ' key={index}>
            <div
                className='flex flex-row items-center justify-between w-full'>
                <span
                    className='flex flex-row items-center text-sm '>
                    <FaTable className='text-sm mr-1 text-green-500 ' />
                    {table.table_name}
                </span>
                <div className='relative z-10 '>
                    <CiSettings onClick={
                        (e) => {
                            e.stopPropagation()
                            setShowTab(!showTab)
                        }}
                        className={`text-xl text-gray-400 cursor-pointer ${showIcon ? 'block' : 'hidden'}`} />
                    {
                        showTab &&
                        <div onMouseLeave={() => setShowTab(false)}
                        className='bg-white border border-gray-300 absolute right-0 p-2 rounded-sm w-36'>
                            <div onClick={
                                (e) => {
                                    e.stopPropagation()
                                    const user_response = window.confirm("Are you sure you want to delete this table?");
                                    if (user_response === true){
                                        dispatch(TableService.deleteTable(table.original_table_name));
                                    }
                            }}
                            className='flex flex-row justify-between items-center hover:underline cursor-pointer'>
                                <FiTrash className='text-xl'/>
                                <span>Delete table</span>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>

    )
}

export default MyTablesEachTableComponent