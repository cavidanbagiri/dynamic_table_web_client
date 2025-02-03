
import React from 'react'

import {useSelector} from 'react-redux'


function TableBodyComponent() {

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);

    return (
        <>
            <tbody className='w-full'>
                {
                    fetch_table?.table_info?.map((row, rowIndex) => (
                        <tr key={rowIndex} className='text-sm'>
                            <td className='border border-gray-200 p-1 text-xs '>
                                {rowIndex + 1}
                            </td>
                            {
                                Object.keys(row).map((key, cellIndex) => {
                                    if (key === 'id') {
                                        return null; 
                                    }
                                    return (
                                        <td key={cellIndex} className='border border-gray-200 p-1 text-xs'>
                                            {row[key]}
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>           
            
        </>
    );
}

export default TableBodyComponent