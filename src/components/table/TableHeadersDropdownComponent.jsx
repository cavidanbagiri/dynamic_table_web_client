import React from 'react'

import { useSelector } from 'react-redux'
import TableHeadersItemComponent from './TableHeadersDropdownItemComponent';

function TableHeadersDropdownComponent() {

    const fetch_table = useSelector((state) => state.tableSlice.fetch_table);

    // Function to format header key
    const formatHeaderKey = (key) => {
        return key
            .replace('_', ' ') // Replace underscores with spaces
            .split(' ') // Split into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join words back into a single string
    };

    return (
        <div className='flex flex-col border p-2 item-start min-w-64 absolute top-10 right-1 z-20 bg-white shadow-lg'>
            <span className='text-center text-3xl font-bold text-gray-500 mb-2'>Headers</span>
            {
                fetch_table?.headers?.map((header) => {
                    const formattedKey = formatHeaderKey(header.key);
                    if (formattedKey === 'Id') {
                        return null;
                    }
                    return (
                        <TableHeadersItemComponent key={formattedKey} header={formattedKey} actualKey={header.key} value={header.value} />
                    );
                })
            }
        </div>
    )
}

export default TableHeadersDropdownComponent