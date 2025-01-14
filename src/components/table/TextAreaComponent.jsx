

import React from 'react'

import { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { IoMdPlay } from "react-icons/io";

import TableService from "../../service/TableService";

function TextAreaComponent() {

    const dispatch = useDispatch();


    const textareaStyle = {width: 'calc(100% - 410px)',};

    const [sql_query, setSqlQuery] = useState('');

    return (
        <div style={{ fontFamily: "JetBrains Mono", ...textareaStyle }} className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>
            
            <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">
                
                <button onClick={() => {
                    dispatch(TableService.filterTableByQuery(sql_query));
                }}
                className="flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md">
                    <IoMdPlay className="text-sm mr-1" /> Run
                </button>

            </div>
            
            <textarea
                value={sql_query}
                onChange={(e) => setSqlQuery(e.target.value)}
                className=" w-full rounded-md p-2 border border-gray-300  outline-gray-400 text-sm "
            />

        </div>
    )
}

export default TextAreaComponent