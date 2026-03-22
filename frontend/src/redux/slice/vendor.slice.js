import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    vendor: [],
    error: false

}

export const getvendor = createAsyncThunk(
    'vendor/getvendor',
    async () => {
        try {
            console.log("getvendorredux");

            const response = await axios.get('http://localhost:4000/vendor/getBlog');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addvendor = createAsyncThunk(
    'vendor/addvendor',
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



            const response = await axios.post('http://localhost:4000/vendor/addvendor', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putvendor = createAsyncThunk(
    'vendor/putvendor',
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
            const response = await axios.put(`http://localhost:4000/vendor/putvendor/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const delvendor = createAsyncThunk(
    'vendor/delvendor',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/vendor/delvendor/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getvendor.fulfilled, (state, action) => {
            console.log(action.payload);
            state.vendor = action.payload;

        })

        builder.addCase(addvendor.fulfilled, (state, action) => {
            state.vendor.push(action.payload)


        })

        builder.addCase(putvendor.fulfilled, (state, action) => {

            const index = state.vendor.findIndex(v => v.id == action.payload.id);
            state.vendor[index] = action.payload;


        })

        builder.addCase(delvendor.fulfilled, (state, action) => {

            const index = state.vendor.findIndex(v => v.id === action.payload);
            state.vendor.splice(index, 1);




        })
    }

})

export default vendorSlice.reducer