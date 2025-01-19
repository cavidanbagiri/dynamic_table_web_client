


import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { IoMdPlay } from "react-icons/io";
import MonacoEditor from '@monaco-editor/react';
import TableService from "../../service/TableService";

import {setFilterSQLQueryStatusForFailed} from '../../store/table_store'

function CodeEditor() {
    const textareaStyle = { width: 'calc(100% - 410px)' };
    const dispatch = useDispatch();
    const editorRef = useRef(null); // Create a ref for the editor

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

    return (
        <div style={{ fontFamily: "JetBrains Mono", ...textareaStyle }} className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>
            

            <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">
                <button onClick={() => {
                    const selectedTextFromEditor = getSelectedText(); // Get the selected text directly
                    if(selectedTextFromEditor.trim() == ''){ 
                        console.log('please select query for execution');
                        dispatch(setFilterSQLQueryStatusForFailed());
                        return;
                    }
                    else{
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
                defaultValue="-- select * from {table_name}"
                options={{
                    selectOnLineNumbers: true, // Enable line number selection
                    lineNumbers: 'on', // Show line numbers
                    automaticLayout: true, // Automatically adjust layout
                }}
                onMount={(editor) => {
                    editorRef.current = editor; // Assign the editor instance to the ref
                }}
            />
            <button onClick={getSelectedText}>Get Selected Text</button>
        </div>
    );
}

export default CodeEditor;



// import React, { useState, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import { IoMdPlay } from "react-icons/io";
// import MonacoEditor from '@monaco-editor/react';
// import TableService from "../../service/TableService";

// function CodeEditor() {
//     const textareaStyle = { width: 'calc(100% - 410px)' };
//     const dispatch = useDispatch();
//     const editorRef = useRef(null); // Create a ref for the editor
//     const [selectedText, setSelectedText] = useState(''); // Separate state for selected text

//     const getSelectedText = () => {
//         if (editorRef.current) {
//             const editor = editorRef.current;
//             const selection = editor.getSelection(); // Get the current selection
//             const selectedTextFromEditor = editor.getModel().getValueInRange(selection); // Get the selected text
//             setSelectedText(selectedTextFromEditor); // Update the selected text state
//             console.log('Selected Text editor:', selectedTextFromEditor); // Log or use the selected text
//             console.log('Selected Text state:', selectedText); // Log or use the selected text
//         } else {
//             console.log('Editor not mounted');
//         }
//     };

//     return (
//         <div style={{ fontFamily: "JetBrains Mono", ...textareaStyle }} className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>
//             <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">
//                 <button onClick={() => {
//                     getSelectedText();
//                     console.log('query', selectedText);
//                     // dispatch(TableService.filterTableByQuery(selectedText));
//                 }}
//                     className="flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md">
//                     <IoMdPlay className="text-sm mr-1" /> Run
//                 </button>
//             </div>

//             <MonacoEditor
//                 className='w-full rounded-md p-2 border border-gray-300 outline-gray-400 text-sm'
//                 defaultLanguage="sql"
//                 defaultValue="-- select * from {table_name}"
//                 options={{
//                     selectOnLineNumbers: true, // Enable line number selection
//                     lineNumbers: 'on', // Show line numbers
//                     automaticLayout: true, // Automatically adjust layout
//                 }}
//                 onMount={(editor) => {
//                     editorRef.current = editor; // Assign the editor instance to the ref
//                 }}
//             />
//             <button onClick={getSelectedText}>Get Selected Text</button>
//         </div>
//     );
// }

// export default CodeEditor;



// import React from 'react'

// import { useState, useRef } from "react";

// import { useDispatch, useSelector } from 'react-redux';

// import { IoMdPlay } from "react-icons/io";

// import TableService from "../../service/TableService";

// import MonacoEditor  from '@monaco-editor/react';



// function CodeEditor() {

//     const textareaStyle = { width: 'calc(100% - 410px)', };

//     const dispatch = useDispatch();

//     const editorRef = useRef(null); // Create a ref for the editor

//     const [sql_query, setSqlQuery] = useState('');

//     const getSelectedText = () => {
//         if (editorRef.current) {
//             const editor = editorRef.current;
//             const selection = editor.getSelection(); // Get the current selection
//             const selectedText = editor.getModel().getValueInRange(selection); // Get the selected text
//             setSqlQuery(selectedText);
//         }
//         else{
//             console.log('else work');
//         }
//     };


//     const handleEditorChange = (value) => {
//         setSqlQuery(value);
//     };

//     return (


//         <div style={{ fontFamily: "JetBrains Mono", ...textareaStyle }} className='flex flex-row w-full rounded-md my-2 outline-gray-400 text-sm'>

//             <div className="flex flex-col text-start w-24 p-2 mr-2 border border-gray-300 rounded-md">

//                 <button onClick={() => {
//                     getSelectedText()
//                     // dispatch(TableService.filterTableByQuery(sql_query));
//                 }}
//                     className="flex flex-row text-sm items-center py-1 px-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded-md">
//                     <IoMdPlay className="text-sm mr-1" /> Run
//                 </button>

//             </div>

//             <MonacoEditor 
//                 onChange={(ev) => handleEditorChange(ev)}
//                 className='w-full rounded-md p-2 border border-gray-300  outline-gray-400 text-sm'
//                 defaultLanguage="sql"
//                 defaultValue="-- select * from {table_name}"
//                 options={{
//                     selectOnLineNumbers: true, // Enable line number selection
//                     lineNumbers: 'on', // Show line numbers
//                     automaticLayout: true, // Automatically adjust layout
//                 }}
//                 onMount={(editor) => {
//                     editorRef.current = editor; // Assign the editor instance to the ref
//                 }}
//             />
//              <button onClick={getSelectedText}>Get Selected Text</button>

//         </div>
//     )
// }

// export default CodeEditor

// {/* <TextareaCodeEditor
//                   value={sql_query}
//                   onChange={(ev) => setSqlQuery(ev.target.value)}
//                   language="sql"
//                   className='w-full rounded-md p-2 border border-gray-300  outline-gray-400 text-sm'
//                   rehypePlugins={[
//                     [rehypePrism, { ignoreMissing: true, showLineNumbers: true }]
//                   ]}
//                   style={{
//                     backgroundColor: "#ffffff",
//                     fontFamily: 'JetBrains Mono',
//                   }}
//                 /> */}