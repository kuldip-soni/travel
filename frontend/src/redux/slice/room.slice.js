import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    room: [],
    error: false

}

 export const getroom = createAsyncThunk(
    'room/getroom',
    async () => {
        try {
            console.log("getroomredux");
            
            const response = await axios.get('http://localhost:4000/room/getroom');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
             console.log(error);
             
        }

    }
)

export const addroom = createAsyncThunk(
    'room/addroom',
    async (data) => {

        try {
            
            console.log(data);
            const formData=new FormData();
            formData.append("name",data.name);
            formData.append("description",data.description);
            formData.append("price",data.price);
            formData.append("room_img",data.room_img);
            const response = await axios.post('http://localhost:4000/room/addroom',formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
           console.log(error);
           
        }

    }
)

export const putroom = createAsyncThunk(
    'room/putroom',
    async (data) => {

        try {

             const formData=new FormData();
              formData.append("package_id",data.package_id);
            formData.append("name",data.name);
            formData.append("description",data.description);
                        formData.append("price",data.price);

            formData.append("room_img",data.room_img);
            console.log(data);
            const response = await axios.put(`http://localhost:4000/room/putroom/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const delroom=createAsyncThunk(
     'room/delroom',
     async (id) => {
        try {
             console.log(id);
            const response = await axios.delete(`http://localhost:4000/room/delroom/${id}`);
            console.log(response);
            return id;
            
        } catch (error) {
            console.log(error);
            
        }
     }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    extraReducers: (builder) => {
    
            builder.addCase(getroom.fulfilled, (state, action) => {
                       console.log(action.payload);
                       state.room = action.payload;
           
                   })
           
                   builder.addCase(addroom.fulfilled, (state, action) => {
                       state.room.push(action.payload)
           
           
                   })
           
                   builder.addCase(putroom.fulfilled, (state, action) => {
           
                        const index = state.room.findIndex(v => v.id == action.payload.id);
                       state.room[index] = action.payload;
           
           
                   })
           
                   builder.addCase(delroom.fulfilled, (state, action) => {
           
                       const index = state.room.findIndex(v => v.id === action.payload);
                       state.room.splice(index, 1);
           
                      
           
           
                   })

    }
})

export default roomSlice.reducer