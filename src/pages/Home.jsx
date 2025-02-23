
import React from 'react'
import PublicTablesComponent from '../components/home/PublicTablesComponent';
import MyFolderComponent from '../components/common/MyFolderComponent';

function Home() {
    return (
        <div className=" flex flex-row items-start p-2 relative">

            <MyFolderComponent />

            <PublicTablesComponent />

        </div>
    );
}

export default Home