
import { createSlice } from "@reduxjs/toolkit"

import axios from "axios"

axios.defaults.withCredentials = true;

import TableService from "../service/TableService.js"


const initialState = {
    my_tables: [],
    public_tables: [],
    favorite_tables: [],
    front_message: '',
    show_message: -1
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
        builder.addCase(TableService.getPublicTables.fulfilled, (state, action) => {
            state.public_tables = action.payload.data;
        })
        

        // Fetch Favorite tables
        builder.addCase(TableService.fetchFavoriteTables.fulfilled, (state, action) => {
            state.favorite_tables = action.payload.data;
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
    
    
    }
})

export const { setShowMessageInitial } = tableSlice.actions

export default tableSlice.reducer