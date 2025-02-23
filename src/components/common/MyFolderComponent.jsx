
import React from 'react'

import { useSelector } from 'react-redux'

import MyTablesComponents from '../home/MyTablesComponents';
import FavoritTables from '../home/FavoritTables';

function MyFolderComponent() {

    const show_my_tables = useSelector((state) => state.commonSlice.show_my_tables);

    return (
        <>{
            show_my_tables &&
            <div className='flex flex-col h-screen border rounded-md bg-black bg-opacity-50 w-screen fixed z-10'>
                
                <div className='bg-white w-80 h-full opacity-100'>

                    <MyTablesComponents />
                    <FavoritTables />

                </div>

  
            </div>
        }
        </>
    )
}

export default MyFolderComponent