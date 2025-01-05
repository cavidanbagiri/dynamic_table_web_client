import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableService from '../../service/TableService';
import FavoriteIconComponent from '../common/FavoriteIconComponent';

function PublicTablesComponent() {

    const dispatch = useDispatch();
    const public_tables = useSelector((state) => state.tableSlice.public_tables);


    useEffect(() => {
        const user_id = localStorage.getItem('id');
        console.log( typeof user_id);
        dispatch(TableService.getPublicTables(user_id));
    }, []);

    return (

        <div className=' flex flex-col w-full'>

            <h1 className='text-2xl font-medium text-start my-6'>Public Tables</h1>

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

                        public_tables.length > 0 &&

                        public_tables.map((table, index) => {
                            return (
                                <tr key={index} className='text-sm'>
                                    <td className='flex items-center justify-center border border-white py-2 '>
                                        <FavoriteIconComponent rule='add' table_id={table.id} />
                                    </td>
                                    <td className='border border-white p-2'>{index + 1}</td>
                                    <td className='border border-white p-2'>{table.table_name}</td>
                                    <td className='border border-white p-2'>{table.table_description}</td>
                                    <td className='border border-white p-2'>{table.username}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>



        </div>
    )
}

export default PublicTablesComponent