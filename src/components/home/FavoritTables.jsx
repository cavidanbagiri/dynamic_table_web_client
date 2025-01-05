
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setShowMessageInitial } from '../../store/table_store';

import TableService from '../../service/TableService';

import FavoriteIconComponent from '../common/FavoriteIconComponent';
import MessageBox from '../common/MessageBox';
import TableSkeleton from '../common/TableSkeleton';


export default function FavoritTables() {

    const dispatch = useDispatch();

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
                        !table_pending === true ?
                    <table>

                        <thead>
                            <tr className='bg-gray-200 text-sm'>
                                <th className='border border-white w-24 p-2'>Fv</th>
                                <th className='border border-white w-24 p-2'>S.No</th>
                                <th className='border border-white w-96'>Table Name</th>
                                <th className='border border-white'>Description</th>
                                <th className='border border-white w-64'>Created By</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                favorite_tables.map((table, index) => (
                                    <tr key={index} className='bg-white text-sm hover:bg-gray-100'>
                                        <td className='border border-white p-2 w-24 flex items-center justify-center'><FavoriteIconComponent rule='delete' table_id={table.id} /></td>
                                        <td className='border border-white p-2 w-24 '>{index + 1}</td>
                                        <td className='border border-white p-2 w-96 '>{table.table_name}</td>
                                        <td className='border border-white p-2 '>{table.table_description}</td>
                                        <td className='border border-white p-2 w-64 '>{table.username}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                    :
                    <TableSkeleton />
                    }

                </div>
            }

        </>
    )
}
