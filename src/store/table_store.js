
import { createSlice } from "@reduxjs/toolkit"

import axios from "axios"

axios.defaults.withCredentials = true;

import TableService from "../service/TableService.js"


const initialState = {
    my_tables: [], // My created tables
    public_tables: [], // Public tables
    favorite_tables: [], // Favorite tables
    front_message: '', // Frontend message
    show_message: -1, // Show message
    table_pending: false, // Table pending
    table_created:{ // Table created
        pending: false,
        message: '',
    },
    table_info: [],
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {

        setShowMessageInitial: (state) => {
            state.show_message = -1;
        },

    },

    extraReducers: (builder) => {
        

        // Show Public tables
        builder.addCase(TableService.getPublicTables.pending, (state, action) => {
            state.table_pending = true
        })
        builder.addCase(TableService.getPublicTables.fulfilled, (state, action) => {
            state.public_tables = action.payload.data;
            state.table_pending = false
        })
        

        // Fetch Favorite tables
        builder.addCase(TableService.fetchFavoriteTables.pending, (state, action) => {
            state.table_pending = true
        })
        builder.addCase(TableService.fetchFavoriteTables.fulfilled, (state, action) => {
            state.favorite_tables = action.payload.data;
            state.table_pending = false
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
        builder.addCase(TableService.fetchTableByName.fulfilled, (state, action) => {
            if(action.payload.status == 200){
                state.table_info = action.payload.data;
                console.log('object is ', state.table_info);
            }
            else{
                state.table_info = [];
            }
        })
        

    }
})

export const { setShowMessageInitial } = tableSlice.actions

export default tableSlice.reducer