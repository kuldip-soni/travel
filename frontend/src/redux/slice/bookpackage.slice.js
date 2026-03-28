import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    booking: null,
    error: false

}

export const getbookpackage = createAsyncThunk(
    'booking/getbookpackage',
    async () => {
        try {
            console.log("kkkk");
            
            const response = await axios.get('http://localhost:4000/booking/getBooking');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const bookpackage = createAsyncThunk(
    'booking/bookpackage',
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

        builder.addCase(getbookpackage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.booking = action.payload;

        });

         builder.addCase(bookpackage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.booking = action.payload;

        });

       
    }

})

export default bookingSlice.reducer