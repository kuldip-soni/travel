import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    location: [],
    error: false

}

 export const getlocation = createAsyncThunk(
    'location/getlocation',
    async () => {
        try {
            console.log("fgfdvsd");
            
            const response = await axios.get('http://localhost:4000/location/getLocation');
            console.log(response.data.data);
        } catch (error) {

        }

    }
)


export const locationSlice = createSlice({
    name: 'location',
    initialState,
    extraReducers: () => {

    }
})