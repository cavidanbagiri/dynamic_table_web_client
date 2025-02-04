
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateFilterHeaderQuery } from '../../store/table_store';

function TableHeaderComponent() {

    const dispatch = useDispatch();

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);

    

    return (
        <>
            <thead className='bg-gray-200 text-xs'>
                <tr>
                    <th className='border border-white w-24 p-2'>
                        <span>Index</span>
                    </th>
                    {
                        fetch_table?.table_info?.length >= 0 &&
                        fetch_table?.headers?.map((header) => {
                            header = header.replace('_', ' ')
                            header = header.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                            if (header === 'Id') {
                                return null; 
                            }
                            return (
                                <th key={header} className='border border-white w-24 p-2 font-medium'>
                                    <span>
                                        {header}
                                    </span>
                                </th>
                            );
                        })
                    }
                </tr>
                <tr >
                    <th className='border border-white w-24 p-2'>
                        <input type="text" placeholder="Search..." className="w-full text-center  " />
                    </th>
                    {
                        fetch_table?.table_info?.length >= 0 &&
                        fetch_table?.headers?.map((header) => {
                            if (header === 'id') {
                                return null; 
                            }
                            return (
                                <th key={header} className='border border-white w-24 p-2'>
                                    <input type="text" onChange={(event) => { 
                                        dispatch(updateFilterHeaderQuery({key: header, value: event.target.value}));
                                    }}
                                    placeholder={`Search ${header}`} className="w-full text-center font-medium" />
                                </th>
                            );
                        })
                    }
                </tr>
            </thead>
        </>
    );

}

export default TableHeaderComponent