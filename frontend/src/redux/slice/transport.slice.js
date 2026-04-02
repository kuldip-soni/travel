import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    transport: [],
    error: false

}

export const gettransport = createAsyncThunk(
    'transport/gettransport',
    async () => {
        try {
            console.log("gettransportredux");

            const response = await axios.get('http://localhost:4000/transport/gettransport');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const addtransport = createAsyncThunk(
    'transport/addtransport',
    async (data) => {
        try {
            console.log("addtransport", data);

            const formData = new FormData();
            formData.append("booking_id", data.booking_id);
            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("from", data.from);
            formData.append("to", data.to);
            formData.append("datetime", data.datetime);
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            formData.append("transport_img", data.transport_img);




            const response = await axios.post('http://localhost:4000/transport/addtransport', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
            
        }

    }
)

export const puttransport = createAsyncThunk(
    'transport/puttransport',
    async (data) => {

        try {
            console.log("addtransport", data);

            const formData = new FormData();

            formData.append("id", data.id);
            formData.append("booking_id", data.booking_id);
            formData.append("vendor_id", data.vendor_id);
            formData.append("service_id", data.service_id);
            formData.append("from", data.from);
            formData.append("to", data.to);
            formData.append("datetime", data.datetime);
            formData.append("passenger", data.passenger);
            formData.append("amount", data.amount);
            formData.append("transport_img", data.transport_img);
            console.log(data);
            const response = await axios.put(`http://localhost:4000/transport/puttransport/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const deltransport = createAsyncThunk(
    'transport/deltransport',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/transport/deltransport/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const transportSlice = createSlice({
    name: 'transport',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(gettransport.fulfilled, (state, action) => {
            console.log(action.payload);
            state.transport = action.payload;

        })
        builder.addCase(addtransport.fulfilled, (state, action) => {
            state.transport.push(action.payload)


        })

        builder.addCase(puttransport.fulfilled, (state, action) => {
            // console.log(id);


            const index = state.transport.findIndex(v => v.id == action.payload.id);
            state.transport[index] = action.payload;


        })

        builder.addCase(deltransport.fulfilled, (state, action) => {

            const index = state.transport.findIndex(v => v.id === action.payload);
            state.transport.splice(index, 1);




        })

    }
})

export default transportSlice.reducer