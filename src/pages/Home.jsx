
import React from 'react'
import MyTablesComponents from '../components/home/MyTablesComponents';
import PublicTablesComponent from '../components/home/PublicTablesComponent';

function Home() {
    return (
        <div className=" flex flex-col items-start p-2">

            <MyTablesComponents />

            <PublicTablesComponent />
     
        </div>
    );
}

export default Home