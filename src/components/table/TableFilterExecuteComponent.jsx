
import React from 'react'

import { IoMdPlay } from "react-icons/io";

function TableFilterExecuteComponent() {
  return (
    <div className='flex flex-row justify-stretch'>

        <div className='mx-2'>
            <button className='flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md'>
                <IoMdPlay className='text-sm  ' /> Execute
            </button>
        </div>
        

    </div>
  )
}

export default TableFilterExecuteComponent