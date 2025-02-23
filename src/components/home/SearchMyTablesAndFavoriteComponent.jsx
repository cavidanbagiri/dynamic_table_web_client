
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { CiSquarePlus } from "react-icons/ci";

import { searchMyTableAndFavoriteTable } from '../../store/table_store';

function SearchMyTablesAndFavoriteComponent() {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    return (
        <div className='flex flex-row items-center justify-between mt-2 mb-4 w-full'>

            <input onChange={(e) => dispatch(searchMyTableAndFavoriteTable(e.target.value))} type="text" placeholder='Search' w-full className='w-56 px-2 text-sm py-1 border border-gray-400 rounded-md outline-none' />

            <button onClick={() => navigate('/createtable')}
            className='bg-green-500 flex flex-row items-center rounded-md py-1 px-3 text-md text-white border-gray-300 hover:bg-green-400 duration-200'>
            {/* <CiSquarePlus
                className='text-3xl text-white cursor-pointer' />  */}
                <span>
                    Create
                </span>
            </button>

        </div>
    )
}

export default SearchMyTablesAndFavoriteComponent