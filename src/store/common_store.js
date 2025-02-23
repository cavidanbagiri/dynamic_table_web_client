
import { createSlice } from '@reduxjs/toolkit'

 const initialState = {

    show_my_tables: false,

 }

export const commonSlice = createSlice({
    name: 'common',
    initialState,

    reducers: {

        triggerShowMyTables: (state) => {
            state.show_my_tables = !state.show_my_tables
        },
    }

})


export const { triggerShowMyTables } = commonSlice.actions

export default commonSlice.reducer
