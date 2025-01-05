

import { createAsyncThunk } from "@reduxjs/toolkit";
import $api, { API_URL } from "../http/index.js";

class TableService {

    // Checked
    static getPublicTables = createAsyncThunk(
        'table/fetchpublictables?user_id',

        
        async (user_id) => {
            const query = user_id == null ? '' : `?user_id=${user_id}`;
            let data = {};
            await $api.get(`/table/fetchpublictables${query}`)
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

    // Checked
    static fetchFavoriteTables = createAsyncThunk(
        'table/fetchfavoritetables',
        async () => {
            let data = {};
            await $api.get('/table/fetchfavoritetables')
                .then((response) => {
                    console.log('fetch favorites is working and result is ', response);
                    data.data = response.data;
                    data.status = response.status;
                }).catch((err) => {
                    data.data = err.response.data;
                    data.status = err.response.status;
                })
            return data;
        }
    )


    // Checked
    static addToFavorites = createAsyncThunk(
        'table/addtofavorites/:table_id',
        async (table_id) => {
            let data = {};
            await $api.post(`/table/addtofavorites/${table_id}`)
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

    // Not ready for testing
    static deleteFromFavorites = createAsyncThunk(
        'table/deletefromfavorites/:table_id',
        async (table_id) => {
            let data = {};
            await $api.post(`/table/deletefromfavorites/${table_id}`)
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