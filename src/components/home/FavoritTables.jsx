
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setShowMessageInitial } from '../../store/table_store';

import TableService from '../../service/TableService';

import FavoriteIconComponent from '../common/FavoriteIconComponent';
import MessageBox from '../common/MessageBox';
import TableSkeleton from '../common/TableSkeleton';

import { useNavigate } from 'react-router-dom';

export default function FavoritTables() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const favorite_tables = useSelector((state) => state.tableSlice.favorite_tables);
    const front_message = useSelector((state) => state.tableSlice.front_message);
    const table_pending = useSelector((state) => state.tableSlice.table_pending);

    const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);

    useEffect(() => {
        if (show_message === 1 || show_message === 0) {
            setTimeout(() => {
                dispatch(setShowMessageInitial());
            }, 1500);
        }
    }, [show_message]);

    useEffect(() => {
        if (is_auth) {
            dispatch(TableService.fetchFavoriteTables());
        }
    }, [is_auth]);

    return (
        <>

            {show_message === 1 ? (
                <MessageBox message={front_message} color={'bg-green-500'} />
            ) : show_message === 0 ? (
                <MessageBox message={front_message} color={'bg-red-500'} />
            ) : null}


            {
                is_auth &&
                <div className='flex flex-col items-start mb-3'>


                    <h1 className='text-2xl font-medium text-start my-6'>Favorite Tables</h1>

                    {
                        table_pending === true ?
                            <TableSkeleton /> :
                            favorite_tables.length === 0 ?
                                <span className='text-md mt-2 text-gray-500'>
                                    There is no favorite tables
                                </span>
                                :
                                favorite_tables.map((table, index) => (
                                    <div className='flex items-center w-full py-2 px-3 ' key={index}>
                                        <FavoriteIconComponent table_id={table.id} rule={'delete'} />

                                        <span onClick={() => navigate(`/table/${table.original_table_name}`)} className='text-md ml-2'>
                                            {table.table_name.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))
                    }

                </div>
            }

        </>
    )
}
