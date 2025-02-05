

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

    // Working On
    static fetchMyTables = createAsyncThunk(
        'table/fetchmytables',
        async () => {
            let data = {};
            await $api.get('/table/fetchmytables')
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

    // Checked
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

    // Checked
    static createTable = createAsyncThunk(
        'table/createtable',
        async (formData) => {
            let data = {};
            await $api.post('/table/createtable', formData)
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
    static fetchTableByName = createAsyncThunk(
        'table/fetch/:table_name',
        async (table_name) => {
            let data = {};
            await $api.get(`/table/fetch/${table_name}`)
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
        static filterTableByHeaders = createAsyncThunk(
            'table/filter/:table_name',
            async (table_info) => {
                let data = {};
                await $api.get(`/table/filter/${table_info.table_name}${table_info.query}`)
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
    static filterTableByQuery = createAsyncThunk(
        'table/query',
        async (sql_query) => {
            let data = {};
            await $api.post(`/table/query`, {sql_query})
                .then((response) => {  
                    console.log(response);
                    data.data = response.data;
                    data.status = response.status;
                }).catch((err) => {
                    data.data = err.response.data;
                    data.status = err.response.status;
                })
            return data;
        }
    )


    // Working On
    static deleteTable = createAsyncThunk(
        'table/deletetable/:table_name',
        async (table_name) => {
            let data = {};
            await $api.delete(`/table/deletetable/${table_name}`)
                .then((response) => {
                    console.log('coming response id ', response);
                    data.data = response.data;
                    data.status = response.status;
                }).catch((err) => {
                    console.log('coming error is ',err);
                    data.data = err.response.data;
                    data.status = err.response.status;
                })
            return data;
        }
    )

}

export default TableService;
