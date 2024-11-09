import { createSlice } from "@reduxjs/toolkit";


const render = createSlice({
    name : "render-state",
    initialState : {
        value : false
    },
    reducers : {
        toggleRender : function(state){
            state.value = !state.value;
        }
    }
})


export const {toggleRender} = render.actions;

export default render.reducer;