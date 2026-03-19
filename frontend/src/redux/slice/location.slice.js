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
            console.log("getlocationredux");

            const response = await axios.get('http://localhost:4000/location/getLocation');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addlocation = createAsyncThunk(
    'location/addLocation',
    async (data) => {

        try {

            console.log(data);

            const formData=new FormData();
            formData.append("city",data.city);
            formData.append("state",data.state);
            formData.append("country",data.country);
            formData.append("image",data.image);

            const response = await axios.post('http://localhost:4000/location/addLocation', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putlocation = createAsyncThunk(
    'location/putlocation',
    async (data) => {

        try {

            console.log(data);
            const response = await axios.put(`http://localhost:4000/location/putlocation/${data.id}`, data);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const dellocation = createAsyncThunk(
    'location/dellocation',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/location/delLocation/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const locationSlice = createSlice({
    name: 'location',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getlocation.fulfilled, (state, action) => {
            console.log(action.payload);
            state.location = action.payload;

        })

        builder.addCase(addlocation.fulfilled, (state, action) => {
            state.location.push(action.payload)


        })

        builder.addCase(putlocation.fulfilled, (state, action) => {

             const index = state.location.findIndex(v => v.id == action.payload.id);
            state.location[index] = action.payload;


        })

        builder.addCase(dellocation.fulfilled, (state, action) => {

            const index = state.location.findIndex(v => v.id === action.payload);
            state.location.splice(index, 1);

           


        })
    }

})

export default locationSlice.reducer