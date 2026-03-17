import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    package: [],
    error: false

}

 export const getpackage = createAsyncThunk(
    'package/getpackage',
    async () => {
        try {
            console.log("getpackageredux");
            
            const response = await axios.get('http://localhost:4000/package/getpackage');
            console.log(response.data.data);
        } catch (error) {

        }

    }
)


export const packageSlice = createSlice({
    name: 'package',
    initialState,
    extraReducers: () => {

    }
})