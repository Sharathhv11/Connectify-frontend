import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState : {
        value : null,
        allUsers : null,
        chats:null,
        selectedChat : null
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
        },
        updateSelectedChat : function(state,action){
            state.selectedChat = action.payload;
        }
    }
})

export const  {updateUser,updateAllUsers,updateChat,updateSelectedChat} = user.actions;

export default user.reducer;