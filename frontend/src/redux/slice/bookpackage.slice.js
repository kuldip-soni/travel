import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    booking: null,
    myBooking:null,
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

export const getmyBooking = createAsyncThunk(
    'myBooking/getmyBooking',
    async () => {
        try {
            console.log("kkkk");

            const user_id = localStorage.getItem("user_id");
            
            const response = await axios.get('http://localhost:4000/booking/getmyBooking/'+ user_id);
            console.log("scsdc",response.data.data);
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
            const user_id = parseInt(localStorage.getItem("user_id"));

            const response = await axios.post('http://localhost:4000/booking/bookpackage', {...data, user_id: user_id});
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

        builder.addCase(getmyBooking.fulfilled, (state, action) => {
            console.log(action.payload);
            state.myBooking = action.payload;

        });

         builder.addCase(bookpackage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.booking = action.payload;

        });

       
    }

})

export default bookingSlice.reducer