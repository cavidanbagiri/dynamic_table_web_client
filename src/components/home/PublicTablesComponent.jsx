import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableService from '../../service/TableService';
import FavoriteIconComponent from '../common/FavoriteIconComponent';
import TableSkeleton from '../common/TableSkeleton';
import { useNavigate } from 'react-router-dom';

function PublicTablesComponent() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const public_tables = useSelector((state) => state.tableSlice.public_tables);
    const public_table_pending = useSelector((state) => state.tableSlice.public_table_pending);

    const [search_keyword, setSearchKeyword] = React.useState('');


    useEffect(() => {
        const user_id = localStorage.getItem('id');
        dispatch(TableService.getPublicTables(user_id));
    }, []);

    return (
        <div className=' flex flex-col w-full p-2 ml-3 rounded-md' style={{fontFamily: 'Roboto'}}>

            <div className='mb-4 flex flex-row justify-between'>
                <h1 className='text-3xl font-medium text-start'>Public Tables</h1>
                <div className='mr-5'>
                    <input onChange={(e) => setSearchKeyword(e.target.value)} type="text" placeholder='Search' className='w-96 px-2 py-2 text-sm border border-gray-400 rounded-md outline-none' />
                    <button onClick={() => {
                        dispatch(TableService.searchPublicTables(search_keyword))
                    }}
                    className='py-2 px-4 ml-2 text-sm border border-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 duration-200'>Search</button>
                </div>
            </div>


            {
                !public_table_pending === true ?
                    <table>

                        <thead>
                            <tr className='text-sm'>
                                <th className='font-medium border w-12 p-2'>Fv</th>
                                <th className='font-medium border max-w-24 p-2 '>S.No</th>
                                <th className='font-medium border w-48'>Table Name</th>
                                <th className='font-medium border'>Description</th>
                                <th className='font-medium border min-w-36'>About</th>
                                <th className='font-medium border min-w-48'>Category</th>
                                <th className='font-medium border max-w-64 min-w-36'>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                public_tables.length > 0 &&

                                public_tables.map((table, index) => {
                                    return (
                                        <tr key={index} className='text-xs hover:bg-gray-200 cursor-pointer border'
                                            onClick={() => navigate(`/table/${table.original_table_name}`)}
                                        >
                                            <td className='flex  items-center justify-center '>
                                                <FavoriteIconComponent rule='add' table_id={table.id} />
                                            </td>
                                            <td className='px-1 text-center'>{index + 1}</td>
                                            <td className='px-1 text-start'>{table.table_name}</td>
                                            <td className='px-1 text-start'>
                                                <span className='line-clamp-1 p-1'>{table.table_description}</span>
                                            </td>
                                            <td className='px-1 text-start'>
                                                <span><span className='text-gray-500 font-medium'>Col</span>:{table.column_size}</span>
                                                <span> / <span className='text-gray-500 font-medium'>Row</span>:{table.row_size}</span>
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    table.table_category === null ? '-' : table?.table_category?.charAt(0).toUpperCase() + table?.table_category?.slice(1)
                                                }
                                            </td>
                                            <td className=''>{table.username} {table.username}</td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                    :
                    <TableSkeleton />
            }

        </div>
    )
}

export default PublicTablesComponent;