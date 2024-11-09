import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js"
import render from "./renderSlice.js"

export default configureStore({
    reducer:{
        user,
        loading:render
    }
})