
import React from 'react'

import { useSelector } from 'react-redux'


function TableBodyComponent() {

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);

    return (
        <>

            <tbody className='w-full'>
                {fetch_table?.table_info?.map((row, rowIndex) => (
                    <tr key={rowIndex} className='text-sm'>
                        {/* Render the row index */}
                        <td className='border border-gray-200 p-1 text-xs text-center'>
                            {rowIndex + 1}
                        </td>

                        {/* Render table cells based on headers' value */}
                        {fetch_table?.headers?.map((header, cellIndex) => {
                            // Skip rendering if header.value is false
                            if (header.value === false) {
                                return null;
                            }

                            // Skip rendering for specific keys (e.g., 'id', 'total_rows')
                            if (header.key === 'id' || header.key === 'total_rows') {
                                return null;
                            }

                            // Render the cell
                            return (
                                <td key={cellIndex} className='border border-gray-200 p-1 text-xs'>
                                    {row[header.key]}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>

        </>
    );
}

export default TableBodyComponent