import { createSlice } from "@reduxjs/toolkit"
import { deleteuser, getuser, getusers, senduser, sendusers } from "./users.thunk"
const getInitialTheme = () => {
    try {
        const savedTheme = localStorage.getItem('tab');
        return savedTheme !== null ? JSON.parse(savedTheme) : true; 
    } catch (error) {
        console.error("Error parsing localStorage value for 'tab':", error);
        return true; 
    }
};

const initialState = {
    users:[],
    sendLoading:false,
    sendError:null,
    toggle: getInitialTheme(),
    defaultfirstname:'',
    defaultlastname:''
}

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        changetheme(state,action){
            const newtheme = action.payload
            state.toggle = newtheme
            localStorage.setItem('tab',JSON.stringify(newtheme))
        },
        defaultvalues(state,action){
             const { firstname, lastname } = action.payload
            state.defaultfirstname = firstname
            state.defaultlastname = lastname
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(sendusers.pending,(state) => {
            state.sendLoading = true
            state.sendError = null
        })
        .addCase(sendusers.fulfilled,(state) => {
            state.sendLoading = false
        })
        .addCase(sendusers.rejected,(state,action) => {
            state.sendLoading = false
            state.sendError = action.payload
        })
        .addCase(getusers.pending,(state) => {
            state.sendLoading = true
        })
        .addCase(getusers.fulfilled,(state,action) => {
            state.sendLoading = false
            state.users = action.payload
            state.sendError = null
        })
        .addCase(getusers.rejected,(state,action) => {
            state.sendLoading = false
            state.sendError = action.payload
        })
        .addCase(deleteuser.pending,(state) => {
            state.sendLoading = true
        })
        .addCase(deleteuser.fulfilled,(state,action) => {
            state.sendLoading = false
            state.sendError = null
            state.users = state.users.filter((user) => user._uuid !== action.payload.id)
        })
        .addCase(deleteuser.rejected,(state,action) => {
            state.sendLoading = false
            state.sendError = action.payload
        })
        .addCase(getuser.pending,(state) => {
            state.sendLoading = true
        })
        .addCase(getuser.fulfilled,(state) => {
            state.sendLoading = false
            state.sendError = null
        })
        .addCase(getuser.rejected,(state,action) => {
            state.sendLoading = false
            state.sendError = action.payload
        })
        .addCase(senduser.pending,((state) => {
            state.sendLoading = true
        }))
        .addCase(senduser.fulfilled,(state) => {
            state.sendLoading = false
            state.sendError = null
        })
        .addCase(senduser.rejected,(state,action) => {
            state.sendLoading = false
            state.sendError = action.payload
        })
    }

})

export default usersSlice.reducer
export const {changetheme,defaultvalues} = usersSlice.actions

