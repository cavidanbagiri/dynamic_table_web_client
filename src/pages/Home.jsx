
import React from 'react'
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setShowMessageInitial } from '../store/table_store';

import TableService from '../service/TableService';

import PublicTablesComponent from '../components/home/PublicTablesComponent';
import MyFolderComponent from '../components/common/MyFolderComponent';
import MessageBox from '../components/common/MessageBox';



function Home() {

    const dispatch = useDispatch();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const front_message = useSelector((state) => state.tableSlice.front_message);

    useEffect(() => {
        if (show_message === 1 || show_message === 0) {
          setTimeout(() => {
            dispatch(setShowMessageInitial());
            dispatch(TableService.fetchMyTables());
          }, 1500);
        }
      }, [show_message, dispatch]);

    return (
        <div className=" flex flex-row items-start p-2 relative">

            {show_message === 1 ? (
                <MessageBox message={front_message} color={'bg-green-500'} />
            ) : show_message === 0 ? (
                <MessageBox message={front_message} color={'bg-red-500'} />
            ) : null}

            <MyFolderComponent />

            <PublicTablesComponent />

        </div>
    );
}

export default Home