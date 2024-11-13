import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState : {
        value : null,
        allUsers : null,
        chats:null
    },
    reducers : {
        updateUser : function(state,action){
            state.value =action.payload;
        },
        updateAllUsers : function(state,action){
            state.allUsers = action.payload
        },

        updateChat : function(state,action){
            state.chats = action.payload
        }
    }
})

export const  {updateUser,updateAllUsers,updateChat} = user.actions;

export default user.reducer;