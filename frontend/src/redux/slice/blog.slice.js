import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    isLoading: false,
    blog: [],
    error: false

}

export const getblog = createAsyncThunk(
    'blog/getblog',
    async () => {
        try {
            console.log("getblogredux");

            const response = await axios.get('http://localhost:4000/blog/getBlog');
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const addblog = createAsyncThunk(
    'blog/addblog',
    async (data) => {

        try {

            console.log(data);

            const formData=new FormData();
            formData.append("title",data.title);
            formData.append("date",data.date);
            formData.append("description",data.description);
            formData.append("blog_img",data.blog_img);

            const response = await axios.post('http://localhost:4000/blog/addblog', formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


export const putblog = createAsyncThunk(
    'blog/putblog',
    async (data) => {

        try {

             const formData=new FormData();
             formData.append("id",data.id);
            formData.append("title",data.title);
            formData.append("date",data.date);
            formData.append("description",data.description);
            formData.append("blog_img",data.blog_img);

            console.log(data);
            const response = await axios.put(`http://localhost:4000/blog/putblog/${data.id}`, formData);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)



export const delblog = createAsyncThunk(
    'blog/delblog',
    async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`http://localhost:4000/blog/delblog/${id}`);
            console.log(response);
            return id;

        } catch (error) {
            console.log(error);

        }
    }
)


export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getblog.fulfilled, (state, action) => {
            console.log(action.payload);
            state.blog = action.payload;

        })

        builder.addCase(addblog.fulfilled, (state, action) => {
            state.blog.push(action.payload)


        })

        builder.addCase(putblog.fulfilled, (state, action) => {

             const index = state.blog.findIndex(v => v.id == action.payload.id);
            state.blog[index] = action.payload;


        })

        builder.addCase(delblog.fulfilled, (state, action) => {

            const index = state.blog.findIndex(v => v.id === action.payload);
            state.blog.splice(index, 1);

           


        })
    }

})

export default blogSlice.reducer