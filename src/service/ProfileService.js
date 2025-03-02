
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";
class ProfileService {

    static uploadProfileImage = createAsyncThunk(
        'profile/uploadprofileimage',
        async (file) => {
            let data = {};
            await $api.post('/profile/uploadprofileimage', file)
                .then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                }).catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
            return data;
        }
    )


}

export default ProfileService