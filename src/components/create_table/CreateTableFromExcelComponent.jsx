import React from 'react'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setShowMessageInitial } from '../../store/table_store';

import TableService from '../../service/TableService';

import MessageBox from '../common/MessageBox';
import ButtonLoader from '../common/ButtonLoader';

function CreateTableFromExcelComponent() {

    const dispatch = useDispatch();

    const show_message = useSelector((state) => state.tableSlice.show_message);
    const front_message = useSelector((state) => state.tableSlice.front_message);

    const created_table = useSelector((state) => state.tableSlice.table_created);

    const [file, setFile] = useState(null);
    const [table_name, setTableName] = useState(null);
    const [table_status, setTableStatus] = useState('public');
    const [table_description, setTableDescription] = useState(null);
    const [category, setCategory] = useState(null);


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
            if (!table_name || !table_status || !table_description || !category) return alert('Table name, status, description and category fields are required');
            const replace_table_name = table_name.replace(/ /g, "_");
            let formData = new FormData()
            formData.append('file', file);
            formData.append('table_status', table_status);
            formData.append('table_description', table_description);
            formData.append('table_name', replace_table_name);
            formData.append('table_category', category);
            dispatch(TableService.createTable(formData));
        }
    }


    useEffect(() => {
        if (show_message === 1 || show_message === 0) {
            setTimeout(() => {
                dispatch(setShowMessageInitial());
            }, 3000);
        }
    }, [show_message])


    return (
        <div className='flex flex-col items-center  text-gray-500  w-80 border border-gray-300 rounded-md'>

            {show_message === 1 ? (
                <MessageBox message={front_message} color={'bg-green-500'} />
            ) : show_message === 0 ? (
                <MessageBox message={front_message} color={'bg-red-500'} />
            ) : null}

            <span className='text-3xl text-black font-medium my-5'>Create Table</span>

            <label htmlFor="file" className='text-sm text-gray-400 '>Choose .xlsx or csv file</label>
            <input type="file" onChange={handleFileChange} className='w-64' required />

            <input type="text" onChange={(e) => setTableName(e.target.value)} placeholder='Table Name'
                className='mt-4 mb-2 border p-2 rounded-md outline-gray-400 w-64'
                required
            />

            <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder='Category'
                className='mt-4 mb-2 border p-2 rounded-md outline-gray-400 w-64'
                required
            />

            {/* <input type="text" onChange={(e) => setTableStatus(e.target.value)} placeholder='Table Status' /> */}
            <select name="table_status" onChange={(e) => setTableStatus(e.target.value)} id="" className='my-2 border p-2 rounded-md outline-gray-400 w-64'>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>


            <textarea name="" id="" cols="30" rows="10"
                onChange={(e) => setTableDescription(e.target.value)}
                placeholder='Table Description'
                className='my-2 border p-2 rounded-md outline-gray-400 w-64'>

            </textarea>

            {
                created_table.pending ?
                    <ButtonLoader />
                    :
                    <button
                        onClick={handleUploadClick}
                        className='flex items-center justify-center my-2 border p-2 w-64 bg-green-500 text-white rounded-md text-md font-medium hover:bg-green-300 hover:text-white duration-200'>
                        Create
                    </button>
            }


        </div>
    )
}

export default CreateTableFromExcelComponent