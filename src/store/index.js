

import { configureStore } from '@reduxjs/toolkit'


import loginRegisterSlice from './login_register_store.js'


export const store = configureStore({
    reducer: {
        loginRegisterSlice: loginRegisterSlice,
    },
})