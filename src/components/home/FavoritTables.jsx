
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { setShowMessageInitial } from '../../store/table_store';
import { triggerShowMyTables } from '../../store/common_store';

import FavoriteIconComponent from '../common/FavoriteIconComponent';
import MessageBox from '../common/MessageBox';
import TableSkeleton from '../common/TableSkeleton';


export default function FavoritTables() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const favorite_tables_filter = useSelector((state) => state.tableSlice.favorite_tables_filter);
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
                <div className='flex flex-col items-start p-2 400 w-full  h-1/2 overflow-hidden overflow-y-auto'>


                    <h1 className='text-xl font-medium'>Favorite Tables</h1>

                    <div className='flex flex-col justify-start items-start my-2 w-full '>
                    {
                        favorite_table_pending === true ?
                            <TableSkeleton /> :
                            favorite_tables_filter.length === 0 ?
                                <span className='text-md mt-2 text-gray-500'>
                                    There is no favorite tables
                                </span>
                                :
                                favorite_tables_filter.map((table, index) => (
                                    <div onClick={() => {
                                        navigate(`/table/${table.original_table_name}`)
                                        dispatch(triggerShowMyTables())
                                    }} 
                                    className='flex py-1 items-center mt-1 w-full rounded-md hover:bg-gray-100 cursor-pointer' key={index}>
                                        <FavoriteIconComponent  table_id={table.id} rule={'delete'} />

                                        <span className='text-sm'>
                                            <div className='line-clamp-1 overflow-hidden overflow-ellipsis'>
                                                {table.table_name.replace('_', ' ')}
                                            </div>
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
