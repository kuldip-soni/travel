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
            return response.data.data;
        } catch (error) {

        }

    }
)

export const addPackage = createAsyncThunk(
    'package/addPackage',
    async (data) => {
        try {
            console.log("addPackage", data);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("duration", data.duration);
            formData.append("price", data.price);
            formData.append("image", data.image);

            const response = await axios.post('http://localhost:4000/package/addpackage', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {

        }

    }
)

export const putpackage = createAsyncThunk(
    'package/putpackage',
    async (data) => {

        try {

            console.log(data);
            const response = await axios.put(`http://localhost:4000/package/putpackage/${data.id}`, data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const delpackage = createAsyncThunk(
    'package/delpackage',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/package/delPackage/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const packageSlice = createSlice({
    name: 'package',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getpackage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.package = action.payload;

        })
        builder.addCase(addPackage.fulfilled, (state, action) => {
            state.package.push(action.payload)


        })

        builder.addCase(putpackage.fulfilled, (state, action) => {

            const index = state.package.findIndex(v => v.id == action.payload.id);
            state.package[index] = action.payload;


        })

        builder.addCase(delpackage.fulfilled, (state, action) => {

            const index = state.package.findIndex(v => v.id === action.payload);
            state.package.splice(index, 1);




        })

    }
})

export default packageSlice.reducer