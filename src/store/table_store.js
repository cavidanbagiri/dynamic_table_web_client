
import { createSlice, original } from "@reduxjs/toolkit"

import axios from "axios"

axios.defaults.withCredentials = true;

import TableService from "../service/TableService.js"


const initialState = {
    my_tables: [], // My created tables
    public_tables: [], // Public tables
    public_table_pending: false, // Table pending
    favorite_tables: [], // Favorite tables
    favorite_table_pending: false, // Favorite table pending
    front_message: '', // Frontend message
    show_message: -1, // Show message
    table_created:{ // Table created
        pending: false,
        message: '',
    },
    fetch_table:{
        table_info: [], // For fething table data
        headers: [], // Get Table Headers
        filter_header_query: '?',
        filter_header_query_dict: {},
        pending: false,
        table_information:{
            total_rows: 0,
            total_columns: 0,
            table_size: 0,
            original_table_name: '',
            filter_information:{
                pending: false,
                total_rows: 0,
                execution_time: 0,
                table_size: 0,
                error_status: -1,
                error_message: '',
            },
            result_information:{ 
                status: -1,
            }
        }
    },
    
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {

        setShowMessageInitial: (state) => {
            state.show_message = -1;
        },

        updateFilterHeaderQuery: (state, action) => {
            
            if(action.payload.value == ''){
                delete state.fetch_table.filter_header_query_dict[action.payload.key];
            }else{
                state.fetch_table.filter_header_query_dict[action.payload.key] = action.payload.value;
            }

            state.fetch_table.filter_header_query = '?';
            Object.keys(state.fetch_table.filter_header_query_dict).forEach((key) => {
                state.fetch_table.filter_header_query += key + '=' + state.fetch_table.filter_header_query_dict[key] + '&';
            });
            state.fetch_table.filter_header_query = state.fetch_table.filter_header_query.slice(0, -1);
        },

        clearFilterHeaderQuery: (state) => {
            state.fetch_table.filter_header_query = '?';
            state.fetch_table.filter_header_query_dict = {};
        },

        setFilterSQLQueryStatusInitial: (state) => {
            state.fetch_table.table_information.filter_information.error_status = -1;
            state.fetch_table.table_information.filter_information.error_message = '';
        },

        setFilterSQLQueryStatusForFailed: (state, action) => {
            state.fetch_table.table_information.filter_information.error_status = 0;
            state.fetch_table.table_information.filter_information.error_message = 'Please select query for execution first and then click execute';
        },

        setFilterSQLQueryResultStatusInitial: (state, action) => {
            state.fetch_table.table_information.result_information.status = -1;
        }

    },

    extraReducers: (builder) => {
        

        // Show Public tables
        builder.addCase(TableService.getPublicTables.pending, (state, action) => {
            state.public_table_pending = true
        })
        builder.addCase(TableService.getPublicTables.fulfilled, (state, action) => {
            state.public_tables = action.payload.data;
            state.public_table_pending = false
        })


        // Fetch My Tables
        builder.addCase(TableService.fetchMyTables.pending, (state, action) => {
            state.my_table_pending = true
        })
        builder.addCase(TableService.fetchMyTables.fulfilled, (state, action) => {
            state.my_tables = action.payload.data;
            state.my_table_pending = false
        })
        builder.addCase(TableService.fetchMyTables.rejected, (state, action) => {
            state.my_table_pending = false
        })


        // Fetch Favorite tables
        builder.addCase(TableService.fetchFavoriteTables.pending, (state, action) => {
            state.favorite_table_pending = true
        })
        builder.addCase(TableService.fetchFavoriteTables.fulfilled, (state, action) => {
            state.favorite_tables = action.payload.data;
            state.favorite_table_pending = false
        })

        // Add to favorites
        builder.addCase(TableService.addToFavorites.fulfilled, (state, action) => {
            if (action.payload.status == 201) {
                state.front_message = action.payload.data.message;
                state.show_message = 1;
                state.favorite_tables.push(action.payload.data.data);
            }

            else{
                state.front_message = action.payload.data.detail;
                state.show_message = 0;
            }

        })
        
        // Delete from favorites
        builder.addCase(TableService.deleteFromFavorites.fulfilled, (state, action) => {
            if (action.payload.status == 201) {
                state.front_message = action.payload.data.message;
                state.show_message = 1;
                state.favorite_tables = state.favorite_tables.filter((table) => table.id !== action.payload.data.id);
            }
            else{
                state.front_message = action.payload.data.message;
                state.show_message = 0;
            }
        })
        

        // Create table
        builder.addCase(TableService.createTable.pending, (state, action) => {
            state.table_created.pending = true;
        })
        builder.addCase(TableService.createTable.fulfilled, (state, action) => {
            if(action.payload.status == 201){
                state.table_created.message = 'Table created successfully';
                state.table_created.pending = false;
                state.show_message = 1;
            }
            else{
                state.table_created.message = action.payload.data.detail;
                state.table_created.pending = false;
                state.show_message = 0;
            }
        })


        // Fetch Table by name
        builder.addCase(TableService.fetchTableByName.pending, (state, action) => {
            state.fetch_table.pending = true
        })
        builder.addCase(TableService.fetchTableByName.fulfilled, (state, action) => {
            console.log('content is ', action.payload);
            if(action.payload.status == 200){
                state.fetch_table.pending = false
                state.fetch_table.table_info = action.payload.data.data;
                state.fetch_table.table_information.filter_information.execution_time = action.payload.data.execution_time;
                state.fetch_table.headers = action.payload.data.headers;
                state.fetch_table.table_information.total_rows = action.payload.data.total_rows;
                state.fetch_table.table_information.total_columns = action.payload.data.total_columns;
                state.fetch_table.table_information.table_size = action.payload.data.table_size;
                state.fetch_table.table_information.original_table_name = action.payload.data.original_table_name;
                state.fetch_table.table_information.filter_information.total_rows = action.payload.data.total_rows;
                state.fetch_table.table_information.filter_information.error_status = 1
                state.fetch_table.table_information.result_information.status = 1
            }
            else{
                state.fetch_table.pending = false
                state.fetch_table.table_information.filter_information.error_status = 0;
                state.fetch_table.table_information.result_information.status = 0
                state.fetch_table.table_info = [];
            }
        })


        // Filter table by headers
        builder.addCase(TableService.filterTableByHeaders.pending, (state, action) => {
            state.fetch_table.table_information.filter_information.pending = true
        })
        builder.addCase(TableService.filterTableByHeaders.fulfilled, (state, action) => {
            if(action.payload.status == 200){
                state.fetch_table.table_information.filter_information.pending = false
                state.fetch_table.table_info = action.payload.data.data;
                state.fetch_table.headers = action.payload.data.headers;
                state.fetch_table.table_information.filter_information.total_rows = action.payload.data.total_rows;
                state.fetch_table.table_information.filter_information.execution_time = action.payload.data.execution_time;
            }
            else{
                state.fetch_table.table_information.filter_information.pending = false
                state.fetch_table.table_information.filter_information.error_status = 0;
                state.fetch_table.table_info = [];
            }
        })


        // Filter table by sql_query
        builder.addCase(TableService.filterTableByQuery.pending, (state, action) => {
            state.fetch_table.table_information.filter_information.pending = true
        })
        builder.addCase(TableService.filterTableByQuery.fulfilled, (state, action) => {
            if(action.payload.status == 200){
                state.fetch_table.table_information.filter_information.pending = false
                state.fetch_table.table_info = action.payload.data.data;     
                state.fetch_table.headers = action.payload.data.headers;
                state.fetch_table.table_information.filter_information.total_rows = action.payload.data.total_rows;  
                state.fetch_table.table_information.filter_information.execution_time = action.payload.data.execution_time;
                state.fetch_table.table_information.filter_information.error_status = 1
                state.fetch_table.table_information.result_information.status = 1
            }
            else{
                state.fetch_table.table_information.filter_information.pending = false;
                state.fetch_table.table_information.filter_information.error_status = 0;
                state.fetch_table.table_information.result_information.status = 0
                state.fetch_table.table_information.filter_information.error_message = action.payload.data.detail;
            }
        })
        

    }
})

export const { setShowMessageInitial, updateFilterHeaderQuery, clearFilterHeaderQuery, setFilterSQLQueryStatusInitial, setFilterSQLQueryStatusForFailed,
    setFilterSQLQueryResultStatusInitial
 } = tableSlice.actions

export default tableSlice.reducer