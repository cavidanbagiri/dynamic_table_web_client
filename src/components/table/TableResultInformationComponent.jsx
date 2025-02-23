

import React from 'react'

import { useSelector } from 'react-redux'

import TableHeaderComponent from './TableHeaderComponent'
import TableBodyComponent from './TableBodyComponent'
import TableSkeleton from '../common/TableSkeleton'

function TableResultInformationComponent() {

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);

    return (
        <>
            <span className='text-start text-2xl font-medium mt-4'>Table Result</span>
            <table className='w-full'>
                <TableHeaderComponent />
                {
                    !fetch_table.pending && !fetch_table.table_information.filter_information.pending ?

                        <TableBodyComponent />

                        : null
                }
            </table>
            {
                fetch_table.pending || fetch_table.table_information.filter_information.pending ?

                    <TableSkeleton />

                    : null
            }
        </>
    )
}

export default TableResultInformationComponent