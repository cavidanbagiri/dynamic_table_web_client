

import React from 'react'
import { useSelector } from 'react-redux'

function MyTablesComponents() {

  const is_auth = useSelector((state) => state.loginRegisterSlice.is_auth);



  return (
    <>

      {
        is_auth &&
        <div className='flex flex-col items-start mb-3'>

          <span className='text-2xl font-medium '>My Tables</span>

          <span className='text-md mt-2 text-gray-500'>
            There is no tables
          </span>

        </div>
      }
    </>

  )
}

export default MyTablesComponents