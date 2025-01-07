

import React from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'


import { FaRegFileExcel } from "react-icons/fa";

function MyTablesComponents() {

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);
  const my_tables = useSelector((state) => state.tableSlice.my_tables);

  const navigate = useNavigate();


  return (
    <>

      {
        is_auth &&
        <div className='flex flex-col items-start mb-3'>

          <span className='text-2xl font-medium '>My Tables</span>

          {
            my_tables.length > 0 ?
              <div>Not Fixed</div>
              :
              <div>
                <span className='text-md my-2 text-gray-500'>
                  There is no tables
                </span>
                <br />
                <button 
                onClick={() => navigate('/createtable')}
                className='flex items-center my-2 border p-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-300 hover:text-white duration-200'>
                  Create Table <FaRegFileExcel className='text-2xl text-white ' />
                </button>

              </div>
          }


        </div>
      }
    </>

  )
}

export default MyTablesComponents