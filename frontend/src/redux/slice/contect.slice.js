import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    contect: [],
    error: false

}

export const getcontect = createAsyncThunk(
    'contect/getcontect',
    async () => {
        try {
            console.log("getcontectredux");

            const response = await axios.get('http://localhost:4000/contect/getcontect');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addcontect = createAsyncThunk(
    'contect/addcontect',
    async (data) => {

        try {

            console.log(data);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("subject", data.subject);
            formData.append("message", data.message);
            
            



            const response = await axios.post('http://localhost:4000/contect/addcontect', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putcontect = createAsyncThunk(
    'contect/putcontect',
    async (data) => {

        try {

            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("subject", data.subject);
            formData.append("message", data.message);
            
            
            console.log(data);
            const response = await axios.put(`http://localhost:4000/contect/putcontect/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const delcontect = createAsyncThunk(
    'contect/delcontect',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/contect/delcontect/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const contectSlice = createSlice({
    name: 'contect',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getcontect.fulfilled, (state, action) => {
            console.log(action.payload);
            state.contect = action.payload;

        })

        builder.addCase(addcontect.fulfilled, (state, action) => {
            state.contect.push(action.payload)


        })

        builder.addCase(putcontect.fulfilled, (state, action) => {

            const index = state.contect.findIndex(v => v.id == action.payload.id);
            state.contect[index] = action.payload;


        })

        builder.addCase(delcontect.fulfilled, (state, action) => {

            const index = state.contect.findIndex(v => v.id === action.payload);
            state.contect.splice(index, 1);




        })
    }

})

export default contectSlice.reducer
