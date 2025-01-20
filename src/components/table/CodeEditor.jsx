


import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdPlay } from "react-icons/io";
import { useParams } from "react-router-dom";
import MonacoEditor from '@monaco-editor/react';
import TableService from "../../service/TableService";

import { setFilterSQLQueryStatusForFailed } from '../../store/table_store'

function CodeEditor() {

    const dispatch = useDispatch();

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);

    const [headers, setHeaders] = useState([]);

    const { tablename } = useParams();

    const editorRef = useRef(null); // Create a ref for the editor

    const textareaStyle = { width: 'calc(100% - 410px)' };

    const getSelectedText = () => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = editor.getSelection(); // Get the current selection
            const selectedTextFromEditor = editor.getModel().getValueInRange(selection); // Get the selected text
            return selectedTextFromEditor; // Return the selected text
        } else {
            return ''; // Return an empty string if the editor is not mounted
        }
    };


    useEffect(() => {
        if (tablename) {
            dispatch(TableService.fetchTableByName(tablename));
        }
    }, [tablename]);

    // useEffect(() => {
    //     if (tablename) {
    //         console.log('if work');
    //         setHeaders(fetch_table.headers);
    //     }
    //     else{
    //         console.log('else work');
    //     }
    // }, [tablename]);

    return (
        <div style={{ fontFamily: "JetBrains Mono", ...textareaStyle }} className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>


            <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">
                <button onClick={() => {
                    const selectedTextFromEditor = getSelectedText(); // Get the selected text directly
                    if (selectedTextFromEditor.trim() == '') {
                        dispatch(setFilterSQLQueryStatusForFailed());
                        return;
                    }
                    else {
                        dispatch(TableService.filterTableByQuery(selectedTextFromEditor)); // Use it directly in the 
                    }
                }}
                    className="flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md">
                    <IoMdPlay className="text-sm mr-1" /> Run
                </button>
            </div>

            <MonacoEditor
                className='w-full rounded-md p-2 border border-gray-300 outline-gray-400 text-sm'
                defaultLanguage="sql"
                defaultValue={tablename ? `-- columns [${fetch_table.headers.join(', ')}] \n-- select * from ${tablename}`
                    : ''}
                options={{
                    selectOnLineNumbers: true, // Enable line number selection
                    lineNumbers: 'on', // Show line numbers
                    automaticLayout: true, // Automatically adjust layout
                }}
                onMount={(editor) => {
                    editorRef.current = editor; // Assign the editor instance to the ref
                }}
            />
        </div>
    );
}

export default CodeEditor;

