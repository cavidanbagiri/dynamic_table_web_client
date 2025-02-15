import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableService from '../../service/TableService';

function CreateTableForm() {
    const dispatch = useDispatch();

    // State for table details
    const [tableName, setTableName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [tableStatus, setTableStatus] = useState('public');

    // State for columns
    const [columns, setColumns] = useState([{ name: '', type: 'string' }]);

    // Handle column input change
    const handleColumnChange = (index, field, value) => {
        const updatedColumns = [...columns];
        updatedColumns[index][field] = value;
        setColumns(updatedColumns);
    };

    // Add a new column
    const addColumn = () => {
        setColumns([...columns, { name: '', type: 'string' }]);
    };

    // Remove a column
    const removeColumn = (index) => {
        const updatedColumns = columns.filter((_, i) => i !== index);
        setColumns(updatedColumns);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare table data
        const tableData = {
            tableName,
            category,
            description,
            columns,
            tableStatus,
        };

        // If colums contains id or Id or ID, throw error
        if (tableData.columns.some((column) => column.name === 'id' || column.name === 'Id' || column.name === 'ID' || column.name === 'iD')) {
            alert('Column name "id" is reserved. Please choose a different name.');
            return;
        }
        dispatch(TableService.createTableFromReadyComponents(tableData));


    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">

            {/* Table Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Table Name</label>
                <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* tableStatus */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Table Status</label>
                <select
                    value={tableStatus}
                    onChange={(e) => setTableStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>


            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Columns */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Columns</label>
                {columns.map((column, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Column Name"
                            value={column.name}
                            onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                            className="w-1/2 p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <select
                            value={column.type}
                            onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                            className="w-1/2 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="string">String</option>
                            <option value="integer">Integer</option>
                            <option value="float">Float</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>

                        </select>
                        <button
                            type="button"
                            onClick={() => removeColumn(index)}
                            className="p-2 bg-red-500 text-white rounded-md"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addColumn}
                    className="p-2 bg-blue-500 text-white rounded-md"
                >
                    Add Column
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded-md"
            >
                Create Table
            </button>
        </form>
    );
}

export default CreateTableForm;