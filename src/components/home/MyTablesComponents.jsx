

import React from 'react'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { FaRegFileExcel } from "react-icons/fa";

import TableService from '../../service/TableService';

function MyTablesComponents() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);
  const my_tables = useSelector((state) => state.tableSlice.my_tables);

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
        <div className='flex flex-col items-start mb-3'>

          <span className='text-2xl font-medium '>My Tables</span>

          {
            my_tables.length > 0 ?
              <div className='flex flex-row flex-wrap'>

                {
                  my_tables.map((table, index) => {
                    return (
                      <div className='flex flex-col items-start p-2 m-2 border border-gray-300 rounded-md' key={index}>
                        <span 
                        onClick={() => {
                          navigate(`/table/${table.original_table_name}`);
                          dispatch(TableService.fetchTableByName(table.original_table_name));
                        }}
                        className='text-md font-medium cursor-pointer'>{table.table_name}</span>
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


          <div>
            <button
              onClick={() => navigate('/createtable')}
              className='flex items-center my-2 border p-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-300 hover:text-white duration-200'>
              Create Table <FaRegFileExcel className='text-2xl text-white ' />
            </button>

          </div>


        </div>
      }
    </>

  )
}

export default MyTablesComponents