

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { IoMdPlay } from "react-icons/io";
import { useParams } from "react-router-dom";
import MonacoEditor from '@monaco-editor/react';
import TableService from "../../service/TableService";
import { setFilterSQLQueryStatusForFailed } from '../../store/table_store';

function CodeEditor() {
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const fetch_table = useSelector(state => state.tableSlice.fetch_table);
    const [tableName, setTableName] = useState('');
    const [headers, setHeaders] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const { tablename } = useParams();
    const editorRef = useRef(null);

    const textareaStyle = { width: 'calc(100% - 200px)' };

    // Restore editor content from localStorage on component mount
    useEffect(() => {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            setEditorContent(savedContent);
        }
    }, []);

    // Save editor content to localStorage whenever it changes
    const handleEditorChange = (value) => {
        setEditorContent(value);
        localStorage.setItem('editorContent', value);
    };

    // Clear localStorage when the component unmounts (optional)
    useEffect(() => {
        return () => {
            localStorage.removeItem('editorContent');
        };
    }, []);

    const getSelectedText = () => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = editor.getSelection();
            const selectedTextFromEditor = editor.getModel().getValueInRange(selection);
            return selectedTextFromEditor;
        } else {
            return '';
        }
    };

    useEffect(() => {
        if (tablename) {
            setTableName(tablename);
        }
    }, [tablename]);

    useEffect(() => {
        if (fetch_table.headers) {
            const temp = []
            for (let i of fetch_table.headers) {
                temp.push(i.key)
            }
            setHeaders(temp);
        }
    }, [fetch_table.headers]);

    useEffect(()=>{
        if (fetch_table.table_information.original_table_name!='') {
            navigate(`/table/${fetch_table.table_information.original_table_name}`);
        }
    },[fetch_table.table_information.original_table_name]);


    return (
        <div  className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>
            <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">
                <button
                    onClick={() => {
                        const selectedTextFromEditor = getSelectedText();
                        if (selectedTextFromEditor.trim() === '') {
                            dispatch(setFilterSQLQueryStatusForFailed());
                        } else {
                            dispatch(TableService.filterTableByQuery(selectedTextFromEditor));
                        }
                    }}
                    className="flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md"
                >
                    <IoMdPlay className="text-sm mr-1" /> Run
                </button>
            </div>

            <MonacoEditor
                className='w-full rounded-md p-2 border border-gray-300 outline-gray-400 text-sm'
                defaultLanguage="sql"
                value={editorContent || (tableName ? `-- Table information: Total size: ${fetch_table.table_information.table_size} / total rows: ${fetch_table.table_information.total_rows} / total columns: ${fetch_table.table_information.total_columns} \n-- columns [${headers?.join(', ')}] \n-- select * from ${tableName}` : '')}
                options={{
                    selectOnLineNumbers: true,
                    lineNumbers: 'on',
                    automaticLayout: true,
                }}
                onChange={handleEditorChange} // Save content on change
                onMount={(editor) => {
                    editorRef.current = editor;
                }}
            />
        </div>
    );
}

export default CodeEditor;
