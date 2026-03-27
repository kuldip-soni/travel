import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    booking: null,
    error: false

}


export const bookpackage = createAsyncThunk(
    'vendor/bookpackage',
    async (data) => {
        try {

            const response = await axios.post('http://localhost:4000/booking/bookpackage', data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(bookpackage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.booking = action.payload;

        });

       
    }

})

export default bookingSlice.reducer