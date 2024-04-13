import { createAsyncThunk, createSlice } from "@reduxjs/toolkit" ;
import axios from "axios";


export let getCategories=createAsyncThunk("categoriesSlice/getCategories",
async()=>{
   let {data}= axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   return data.data
}
)

let initialState={categories:[],loading:false ,isError:null}

let CategoriesSlice=createSlice({
    name:"categoriesSlice",
    initialState,
    extraReducers:{
        [getCategories.pending]:(state,action)=>{
            state.loading=true;

        },
        [getCategories.fulfilled]:(state,action)=>{
            state.categories=action.payload;
            state.loading=false;


        },
        [getCategories.rejected]:(state,action)=>{
            state.isError=action.payload;
            state.loading=false;


        }
    }
})
export let CategoriesReducer= CategoriesSlice.reducer;