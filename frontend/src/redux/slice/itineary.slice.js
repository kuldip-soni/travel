import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    itineary: [],
    error: false

}

 export const getitineary = createAsyncThunk(
    'itineary/getitineary',
    async () => {
        try {
            console.log("getitinearyredux");
            
            const response = await axios.get('http://localhost:4000/itineary/getitineary');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
             console.log(error);
             
        }

    }
)

export const additineary = createAsyncThunk(
    'itineary/additineary',
    async (data) => {

        try {
            
            console.log(data);
            const formData=new FormData();
            formData.append("package_id",data.package_id);
            formData.append("title",data.title);
            formData.append("description",data.description);
            formData.append("itineary_img",data.itineary_img);
            const response = await axios.post('http://localhost:4000/itineary/additineary',formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
           console.log(error);
           
        }

    }
)

export const putitineary = createAsyncThunk(
    'itineary/putitineary',
    async (data) => {

        try {

             const formData=new FormData();
              formData.append("package_id",data.package_id);
            formData.append("title",data.title);
            formData.append("description",data.description);
            formData.append("itineary_img",data.itineary_img);
            console.log(data);
            const response = await axios.put(`http://localhost:4000/itineary/putitineary/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const delitineary=createAsyncThunk(
     'itineary/delitineary',
     async (id) => {
        try {
             console.log(id);
            const response = await axios.delete(`http://localhost:4000/itineary/delitineary/${id}`);
            console.log(response);
            return id;
            
        } catch (error) {
            console.log(error);
            
        }
     }
)

export const itinearySlice = createSlice({
    name: 'itineary',
    initialState,
    extraReducers: (builder) => {
    
            builder.addCase(getitineary.fulfilled, (state, action) => {
                       console.log(action.payload);
                       state.itineary = action.payload;
           
                   })
           
                   builder.addCase(additineary.fulfilled, (state, action) => {
                       state.itineary.push(action.payload)
           
           
                   })
           
                   builder.addCase(putitineary.fulfilled, (state, action) => {
           
                        const index = state.itineary.findIndex(v => v.id == action.payload.id);
                       state.itineary[index] = action.payload;
           
           
                   })
           
                   builder.addCase(delitineary.fulfilled, (state, action) => {
           
                       const index = state.itineary.findIndex(v => v.id === action.payload);
                       state.itineary.splice(index, 1);
           
                      
           
           
                   })

    }
})

export default itinearySlice.reducer