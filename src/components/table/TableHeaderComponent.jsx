


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilterHeaderQuery } from '../../store/table_store';

function TableHeaderComponent() {
    const dispatch = useDispatch();
    const fetch_table = useSelector(state => state.tableSlice.fetch_table);


    // Function to format header key
    const formatHeaderKey = (key) => {
        return key
            .replace('_', ' ') // Replace underscores with spaces
            .split(' ') // Split into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join words back into a single string
    };

    return (
        <>
            <thead className='bg-gray-200 text-xs'>
                {/* First Row: Display Header Names */}
                <tr>
                    <th className='border border-white w-24 p-2'>
                        <span>Index</span>
                    </th>
                    {fetch_table?.headers?.map((header) => {
                        const formattedKey = formatHeaderKey(header.key);
                        if (formattedKey === 'Id') {
                            return null; // Skip rendering for 'Id'
                        }
                        else if(header.value === false) {
                            return null
                        }
                        return (
                            <th key={header.key} className='border border-white w-24 p-2 font-medium'>
                                <span>{formattedKey}</span>
                            </th>
                        );
                    })}
                </tr>

                {/* Second Row: Search Inputs */}
                <tr>
                    <th className='border border-white w-24 p-2'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full text-center"
                        />
                    </th>
                    {fetch_table?.headers?.map((header) => {
                        const formattedKey = formatHeaderKey(header.key);
                        if (formattedKey === 'Id') {
                            return null; // Skip rendering for 'Id'
                        }
                        else if(header.value === false) {
                            return null
                        }
                        return (
                            <th key={header.key} className='border border-white w-24 p-2'>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        dispatch(updateFilterHeaderQuery({
                                            key: header.key,
                                            value: event.target.value
                                        }));
                                    }}
                                    placeholder={`Search ${formattedKey}`}
                                    className="w-full text-center font-medium"
                                />
                            </th>
                        );
                    })}
                </tr>
            </thead>
        </>
    );
}

export default TableHeaderComponent;


// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// import { updateFilterHeaderQuery } from '../../store/table_store';

// function TableHeaderComponent() {

//     const dispatch = useDispatch();

//     const fetch_table = useSelector(state => state.tableSlice.fetch_table);

//     console.log('headers is here', fetch_table.headers);

//     return (
//         <>
//             <thead className='bg-gray-200 text-xs'>
//                 <tr>
//                     <th className='border border-white w-24 p-2'>
//                         <span>Index</span>
//                     </th>
//                     {
//                         fetch_table?.table_info?.length >= 0 &&
//                         fetch_table?.headers?.map((header) => {
//                             header.key = header.key.replace('_', ' ')
//                             header.key = header.key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
//                             if (header.key === 'Id') {
//                                 return null; 
//                             }
//                             return (
//                                 <th key={header.key} className='border border-white w-24 p-2 font-medium'>
//                                     <span>
//                                         {header.key}
//                                     </span>
//                                 </th>
//                             );
//                         })
//                     }
//                 </tr>
//                 <tr >
//                     <th className='border border-white w-24 p-2'>
//                         <input type="text" placeholder="Search..." className="w-full text-center  " />
//                     </th>
//                     {
//                         fetch_table?.table_info?.length >= 0 &&
//                         fetch_table?.headers?.map((header) => {
//                             if (header.key === 'id') {
//                                 return null; 
//                             }
//                             return (
//                                 <th key={header.key} className='border border-white w-24 p-2'>
//                                     <input type="text" onChange={(event) => { 
//                                         dispatch(updateFilterHeaderQuery({key: header.key, value: event.target.value}));
//                                     }}
//                                     placeholder={`Search ${header.key}`} className="w-full text-center font-medium" />
//                                 </th>
//                             );
//                         })
//                     }
//                 </tr>
//             </thead>
//         </>
//     );

// }

// export default TableHeaderComponent