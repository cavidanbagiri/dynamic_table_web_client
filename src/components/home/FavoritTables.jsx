
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { setShowMessageInitial } from '../../store/table_store';


import FavoriteIconComponent from '../common/FavoriteIconComponent';
import MessageBox from '../common/MessageBox';
import TableSkeleton from '../common/TableSkeleton';


export default function FavoritTables() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const favorite_tables = useSelector((state) => state.tableSlice.favorite_tables);
    const front_message = useSelector((state) => state.tableSlice.front_message);
    const favorite_table_pending = useSelector((state) => state.tableSlice.favorite_table_pending);

    const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

    useEffect(() => {
        if (show_message === 1 || show_message === 0) {
            setTimeout(() => {
                dispatch(setShowMessageInitial());
            }, 1500);
        }
    }, [show_message]);

    return (
        <>

            {show_message === 1 ? (
                <MessageBox message={front_message} color={'bg-green-500'} />
            ) : show_message === 0 ? (
                <MessageBox message={front_message} color={'bg-red-500'} />
            ) : null}


            {
                is_auth &&
                <div className='flex flex-col items-start my-2 400 w-full'>


                    <h1 className='text-2xl font-medium text-start mb-2'>Favorite Tables</h1>

                    <div className='flex flex-row justify-start items-center  w-full'>
                    {
                        favorite_table_pending === true ?
                            <TableSkeleton /> :
                            favorite_tables.length === 0 ?
                                <span className='text-md mt-2 text-gray-500'>
                                    There is no favorite tables
                                </span>
                                :
                                favorite_tables.map((table, index) => (
                                    <div className='flex items-center  mr-2 px-1 border rounded-md cursor-pointer hover:bg-gray-100' key={index}>
                                        <FavoriteIconComponent  table_id={table.id} rule={'delete'} />

                                        <span onClick={() => navigate(`/table/${table.original_table_name}`)} className='text-xs '>
                                            {table.table_name.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))
                    }
                    </div>

                </div>
            }

        </>
    )
}
