

import React from 'react'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'


import TableService from '../../service/TableService';

import SearchMyTablesAndFavoriteComponent from './SearchMyTablesAndFavoriteComponent';
import MyTablesEachTableComponent from './MyTablesEachTableComponent';

function MyTablesComponents() {

  const dispatch = useDispatch();


  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);
  const my_tables_filter = useSelector((state) => state.tableSlice.my_tables_filter);


  useEffect(() => {
    if (is_auth === true) {
      dispatch(TableService.fetchMyTables());
    }
  }, [is_auth, dispatch]);

  return (
    <>

  
      {
        is_auth &&
        <div className='flex flex-col items-start border-b p-2 w-full h-1/2 overflow-hidden overflow-y-auto'>

          <div className='flex flex-col items-start w-full'>


            <SearchMyTablesAndFavoriteComponent />

            <span className='text-xl font-medium '>My Tables</span>

            {
              my_tables_filter.length > 0 ?
                <div className='flex flex-col w-full'>

                  {
                    my_tables_filter.map((table, index) => {
                      return (
                        <MyTablesEachTableComponent table={table} key={index} />
                      )
                    })
                  }



                </div>
                :
                <span className='text-md my-2 text-gray-500'>
                  There is no tables
                </span>
            }
          </div>


        </div>
      }
    </>

  )
}

export default MyTablesComponents