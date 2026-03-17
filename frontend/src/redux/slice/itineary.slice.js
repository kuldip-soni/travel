import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    itineary: [],
    error: false

}

 export const getitineary = createAsyncThunk(
    'itineary/getitineary',
    async () => {
        try {
            console.log("getitinearyredux");
            
            const response = await axios.get('http://localhost:4000/itineary/getitineary');
            console.log(response.data.data);
        } catch (error) {

        }

    }
)


export const itinearySlice = createSlice({
    name: 'itineary',
    initialState,
    extraReducers: () => {

    }
})