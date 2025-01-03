

import { createAsyncThunk } from "@reduxjs/toolkit";
import $api, { API_URL } from "../http/index.js";

class TableService {

    static getPublicTables = createAsyncThunk(
        'table/fetchpublictables',
        async () => {
            let data = {};
            await $api.get('/table/fetchpublictables')
                .then((response) => {
                    data.data = response.data;
                    data.status = response.status;
                }).catch((err) => {
                    data.data = err.response.data;
                    data.status = err.response.status;
                })
            return data;
        }
    )

}

export default TableService;