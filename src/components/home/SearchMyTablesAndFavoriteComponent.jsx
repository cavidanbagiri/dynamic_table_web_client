
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { CiSquarePlus } from "react-icons/ci";

import { searchMyTableAndFavoriteTable } from '../../store/table_store';

function SearchMyTablesAndFavoriteComponent() {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    return (
        <div className='flex flex-row items-center justify-between mt-2 mb-4'>

            <input onChange={(e) => dispatch(searchMyTableAndFavoriteTable(e.target.value))} type="text" placeholder='Search' className='px-2 py-1 border border-gray-300 rounded-md outline-none' />

            <CiSquarePlus
                onClick={() => navigate('/createtable')}
                className='text-4xl text-gray-400 cursor-pointer' />

        </div>
    )
}

export default SearchMyTablesAndFavoriteComponent