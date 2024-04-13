import { configureStore } from "@reduxjs/toolkit";
import { CategoriesReducer } from "./CategoriesSlice";

export let store=configureStore({
    reducer:{
        categories:CategoriesReducer

    }
})