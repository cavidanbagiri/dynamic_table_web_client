import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableService from '../../service/TableService';

function PublicTablesComponent() {
    const dispatch = useDispatch();
    const public_tables = useSelector((state) => state.tableSlice.public_tables);

    useEffect(() => {
        dispatch(TableService.getPublicTables());
    }, []);

    return (



        <div className='bg-red-300 flex flex-col w-full'>

            <table>

                <thead>
                    <tr className='bg-gray-200 text-sm'>
                        <th className='border border-white w-24 p-2'>S.No</th>
                        <th className='border border-white w-96'>Table Name</th>
                        <th className='border border-white'>Description</th>
                        <th className='border border-white w-64'>Created By</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        public_tables.map((table, index) => {
                            return (
                                <tr key={index} className='text-sm'>
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