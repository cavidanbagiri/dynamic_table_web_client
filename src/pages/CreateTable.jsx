

import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setShowMessageInitial } from '../store/table_store';

import TableService from '../service/TableService';

import MessageBox from '../components/common/MessageBox';
import ButtonLoader from '../components/common/ButtonLoader';


function CreateTable() {

    const dispatch = useDispatch();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const created_table = useSelector((state) => state.tableSlice.table_created);

    const [file, setFile] = useState(null);
    const [table_name, setTableName] = useState(null);
    const [table_status, setTableStatus] = useState(null);
    const [table_description, setTableDescription] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            alert('Please select a file');
            return;
        }
        else {
            if(!table_name || !table_status || !table_description) return alert('Table name, status and description fields are required');
            const replace_table_name = table_name.replace(/ /g, "_");
            let formData = new FormData()
            formData.append('file', file);
            formData.append('table_status', table_status);
            formData.append('table_description', table_description);
            formData.append('table_name', replace_table_name);
            dispatch(TableService.createTable(formData));
        }
    }


    useEffect(() => {
        if (show_message === 1 || show_message === 0) {
            setTimeout(() => {
                dispatch(setShowMessageInitial());
            }, 1500);
        }
    }, [show_message])

    return (
        <div className='flex flex-col items-start bg-red-500'>

            {show_message === 1 ? (
                <MessageBox message={created_table.message} color={'bg-green-500'} />
            ) : show_message === 0 ? (
                <MessageBox message={created_table.message} color={'bg-red-500'} />
            ) : null}

            <span>Create Table From excel(.xlsx) or from csv(.csv)</span>

            <input type="file" onChange={handleFileChange} />

            <input type="text" onChange={(e) => setTableName(e.target.value)} placeholder='Table Name' />

            <input type="text" onChange={(e) => setTableStatus(e.target.value)} placeholder='Table Status' />

            <input type="text" onChange={(e) => setTableDescription(e.target.value)} placeholder='Table Description' />
            {
                created_table.pending ?
                    <ButtonLoader />
                    :
                    <button
                        onClick={handleUploadClick}
                        className='flex items-center my-2 border p-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-300 hover:text-white duration-200'>
                        Create
                    </button>
            }


        </div>
    )
}

export default CreateTable