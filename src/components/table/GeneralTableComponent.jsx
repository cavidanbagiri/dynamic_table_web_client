
import React, { useEffect } from 'react'


import { CiViewTable } from "react-icons/ci";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableService from '../../service/TableService';
import CodeEditor from './CodeEditor';
import MessageBox from '../common/MessageBox';
import PublicTablesComponent from '../home/PublicTablesComponent';
import { setFilterSQLQueryResultStatusInitial } from '../../store/table_store';
import { setFilterSQLQueryStatusInitial } from '../../store/table_store';



function GeneralTableComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetch_table = useSelector(state => state.tableSlice.fetch_table);
    const favorite_tables = useSelector(state => state.tableSlice.favorite_tables);
    const my_tables = useSelector(state => state.tableSlice.my_tables);

    useEffect(() => {
        if (fetch_table.table_information.filter_information.error_status == 0) {
            setTimeout(() => {
                dispatch(setFilterSQLQueryStatusInitial());
            }, 6000)
        }
    }, [fetch_table]);


    useEffect(() => {
        if (fetch_table.table_information.filter_information.error_status == 0) {
            setTimeout(() => {
                dispatch(setFilterSQLQueryStatusInitial());
            }, 6000)
        }
    }, [fetch_table]);

    useEffect(() => {
        if (fetch_table.table_information.result_information.status == 1) {
            setTimeout(() => {
                dispatch(setFilterSQLQueryResultStatusInitial());
            }, 6000)
        }
    }, [fetch_table]);


    return (
        <div className='flex flex-col'>


            {
                fetch_table.table_information.filter_information.error_status == 0 &&
                <MessageBox message={fetch_table.table_information.filter_information.error_message} color={'bg-red-500'} />
            }

            {
                fetch_table.table_information.result_information.status == 1 &&
                <MessageBox
                    message={
                        fetch_table.table_information.filter_information.error_message
                            ? fetch_table.table_information.filter_information.error_message +
                            ' | Execution time: ' +
                            fetch_table.table_information.filter_information.execution_time + 'ms'
                            : 'Affected rows: ' +
                            fetch_table.table_information.filter_information.total_rows +
                            ' | Execution time: ' +
                            fetch_table.table_information.filter_information.execution_time + 'ms'
                    }
                    color={'bg-green-500'}
                />
            }



            <div className='flex flex-row h-96 '>

                <CodeEditor />

            </div>


            <PublicTablesComponent />

        </div>
    )
}

export default GeneralTableComponent