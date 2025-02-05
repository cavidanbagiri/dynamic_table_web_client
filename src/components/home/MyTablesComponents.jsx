

import React from 'react'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { FaTable } from "react-icons/fa";

import TableService from '../../service/TableService';

import SearchMyTablesAndFavoriteComponent from './SearchMyTablesAndFavoriteComponent';

function MyTablesComponents() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);
  const my_tables_filter = useSelector((state) => state.tableSlice.my_tables_filter);

  const navigate = useNavigate();

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

          <div className='flex flex-col items-start'>

            <span className='text-xl font-medium '>My Tables</span>

            <SearchMyTablesAndFavoriteComponent />

            {
              my_tables_filter.length > 0 ?
                <div className='flex flex-col w-full  '>

                  {
                    my_tables_filter.map((table, index) => {
                      return (
                        <div onClick={() => {
                          navigate(`/table/${table.original_table_name}`);
                          dispatch(TableService.fetchTableByName(table.original_table_name));
                        }}
                        className='flex flex-col items-start p-2 mt-1 mr-2 rounded-md hover:bg-gray-100 cursor-pointer ' key={index}>
                          <span
                            className='flex  flex-row items-center text-sm '>
                              <FaTable className='text-sm mr-1 text-green-500 '/>
                              {table.table_name}
                          </span>
                        </div>
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