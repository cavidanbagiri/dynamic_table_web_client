
import React from 'react'
import MyTablesComponents from '../components/home/MyTablesComponents';
import PublicTablesComponent from '../components/home/PublicTablesComponent';
import FavoritTables from '../components/home/FavoritTables';

function Home() {
    return (
        <div className=" flex flex-col items-start p-2">

            <MyTablesComponents />

            <FavoritTables />

            <PublicTablesComponent />
     
        </div>
    );
}

export default Home