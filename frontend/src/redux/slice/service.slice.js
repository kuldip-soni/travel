import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    service: [],
    error: false

}

export const getservice = createAsyncThunk(
    'service/getservice',
    async () => {
        try {
            console.log("getserviceredux");

            const response = await axios.get('http://localhost:4000/service/getBlog');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addservice = createAsyncThunk(
    'service/addservice',
    async (data) => {

        try {

            console.log(data);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("phoneno", data.phoneno);
            formData.append("gstno", data.gstno);
            formData.append("email", data.email);
            formData.append("type", data.type);
            formData.append("company_name", data.company_name);
            formData.append("status", data.status);
            formData.append("vendor_img", data.vendor_img);


            const response = await axios.post('http://localhost:4000/service/addservice', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putservice = createAsyncThunk(
    'service/putservice',
    async (data) => {

        try {

            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("name", data.name);
            formData.append("phoneno", data.phoneno);
            formData.append("gstno", data.gstno);
            formData.append("email", data.email);
            formData.append("type", data.type);
            formData.append("company_name", data.company_name);
            formData.append("status", data.status);
            formData.append("vendor_img", data.vendor_img);


            console.log(data);
            const response = await axios.put(`http://localhost:4000/service/putservice/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const delservice = createAsyncThunk(
    'service/delservice',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/service/delservice/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getservice.fulfilled, (state, action) => {
            console.log(action.payload);
            state.service = action.payload;

        })

        builder.addCase(addservice.fulfilled, (state, action) => {
            state.service.push(action.payload)


        })

        builder.addCase(putservice.fulfilled, (state, action) => {

            const index = state.service.findIndex(v => v.id == action.payload.id);
            state.service[index] = action.payload;


        })

        builder.addCase(delservice.fulfilled, (state, action) => {

            const index = state.service.findIndex(v => v.id === action.payload);
            state.service.splice(index, 1);




        })
    }

})

export default serviceSlice.reducer