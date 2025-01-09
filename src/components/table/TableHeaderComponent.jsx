
import React from 'react'


function TableHeaderComponent(props) {

   
    return (
        <>
            <thead className='bg-gray-200 text-sm'>
                <tr>
                    <th className='border border-white w-24 p-2'>
                        <span>Index</span>
                    </th>
                    {
                        props.table_info.length > 0 &&
                        Object.keys(props.table_info[0]).map((header) => {
                            header = header.replace('_', ' ')
                            header = header.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                            if (header === 'Id') {
                                return null; 
                            }
                            return (
                                <th key={header} className='border border-white w-24 p-2'>
                                    <span>
                                        {header}
                                    </span>
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