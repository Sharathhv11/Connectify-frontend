import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState : {
        value : null,
        allUsers : null
    },
    reducers : {
        updateUser : function(state,action){
            state.value =action.payload;
        },
        updateAllUsers : function(state,action){
            state.allUsers = action.payload
        }
    }
})

export const  {updateUser,updateAllUsers} = user.actions;

export default user.reducer;