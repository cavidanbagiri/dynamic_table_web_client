

import React from 'react'

import CreateTableFromExcelComponent from '../components/create_table/CreateTableFromExcelComponent'

import CreateTableForm from '../components/create_table/CreateFromReadyComponents'


function CreateTable() {

   
    return (
        <div className='p-2 flex flex-row'>

            <CreateTableFromExcelComponent />

            <CreateTableForm />

        </div>
    )
}

export default CreateTable