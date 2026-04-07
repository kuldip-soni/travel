import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    hotel: [],
    error: false

}

export const gethotel = createAsyncThunk(
    'hotel/gethotel',
    async () => {
        try {
            console.log("gethotelredux");

            const response = await axios.get('http://localhost:4000/hotel/gethotel');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const addhotel = createAsyncThunk(
    'hotel/addhotel',
    async (data) => {
        try {
            console.log("addhotel", data);

            const formData = new FormData();
            formData.append("booking_id", data.booking_id);
            formData.append("location_id", data.location_id);

            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("checkin", data.checkin);
            formData.append("checkout", data.checkout);
            formData.append("datetime", data.datetime);
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            formData.append("hotel_img", data.hotel_img);




            const response = await axios.post('http://localhost:4000/hotel/addhotel', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const puthotel = createAsyncThunk(
    'hotel/puthotel',
    async (data) => {

        try {
            console.log("addhotel", data);

            const formData = new FormData();

            formData.append("id", data.id);
            formData.append("booking_id", data.booking_id);
            formData.append("location_id", data.location_id);

            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("checkin", data.checkin);
            formData.append("checkout", data.checkout);
            formData.append("datetime", data.datetime);
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            formData.append("hotel_img", data.hotel_img);
            console.log(data);
            const response = await axios.put(`http://localhost:4000/hotel/puthotel/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const delhotel = createAsyncThunk(
    'hotel/delhotel',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/hotel/delhotel/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(gethotel.fulfilled, (state, action) => {
            console.log(action.payload);
            state.hotel = action.payload;

        })
        builder.addCase(addhotel.fulfilled, (state, action) => {
            state.hotel.push(action.payload)


        })

        builder.addCase(puthotel.fulfilled, (state, action) => {
            // console.log(id);


            const index = state.hotel.findIndex(v => v.id == action.payload.id);
            state.hotel[index] = action.payload;


        })

        builder.addCase(delhotel.fulfilled, (state, action) => {

            const index = state.hotel.findIndex(v => v.id === action.payload);
            state.hotel.splice(index, 1);




        })

    }
})

export default hotelSlice.reducer