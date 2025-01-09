import React from 'react'



function TableBodyComponent(props) {
    return (
        <>
            <tbody className='w-full'>
                {
                    props.table_info.map((row, rowIndex) => (
                        <tr key={rowIndex} className='text-sm'>
                            <td className='border border-gray-200 p-2'>
                                {rowIndex + 1}
                            </td>
                            {
                                Object.keys(row).map((key, cellIndex) => {
                                    if (key === 'id') {
                                        return null; 
                                    }
                                    return (
                                        <td key={cellIndex} className='border border-gray-200 p-2'>
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