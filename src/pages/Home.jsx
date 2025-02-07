
import React from 'react'
import MyTablesComponents from '../components/home/MyTablesComponents';
import PublicTablesComponent from '../components/home/PublicTablesComponent';
import FavoritTables from '../components/home/FavoritTables';

function Home() {
    return (
        <div className=" flex flex-row items-start p-2">

            <div className='flex flex-col h-screen border rounded-md '>

                <MyTablesComponents />

                <FavoritTables />

            </div>

            <PublicTablesComponent />

        </div>
    );
}

export default Home