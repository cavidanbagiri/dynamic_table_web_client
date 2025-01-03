

import { configureStore } from '@reduxjs/toolkit'


import loginRegisterSlice from './login_register_store.js'
import tableSlice from './table_store.js'



export const store = configureStore({
    reducer: {
        loginRegisterSlice: loginRegisterSlice,
        tableSlice: tableSlice,
    },
})