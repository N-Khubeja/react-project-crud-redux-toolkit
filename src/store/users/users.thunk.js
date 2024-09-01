import { createAsyncThunk } from "@reduxjs/toolkit";
const key = 'H3IQG0aEsYtApaE7Vyac2WZhkrjVx2a4U-VpPlR8lIUYrCF6aQ'
export const sendusers = createAsyncThunk(
    'users/POST',
    async (body,ThunkAPI) => {
        try {
            const res = await fetch('/api/v1/users',{
                method: 'POST',
                headers:{
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${key}`
                },
                body: JSON.stringify(body)

            })
            console.log(res)
            if(!res.ok) throw new Error('cringeee')
            const data = await res.json()
            console.log(data)
            if(data) return ThunkAPI.fulfillWithValue()
        } catch (error) {
            return ThunkAPI.rejectWithValue('errror')
        }
    }
)

export const getusers = createAsyncThunk(
    'users/GET-ALL',
    async (_,ThunkAPI) => {
        try {
            const res = await fetch('/api/v1/users',{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                }
            })
            const data = await res.json()
            if(data) return ThunkAPI.fulfillWithValue(data.items)
        } catch (error) {
            return ThunkAPI.rejectWithValue('cant get users')
        }
    }
)

export const deleteuser = createAsyncThunk(
    'users/DELETE',
    async(id,ThunkAPI) => {
        try {
            const res = await fetch(`/api/v1/users/${id}`,{
                method:'DELETE',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                }
            })
            const data = await res.json()
            console.log(data)
             if(data) return ThunkAPI.fulfillWithValue(id)
        } catch (error) {
            return ThunkAPI.rejectWithValue('cant get users')
        }
    }
)

export const getuser = createAsyncThunk(
    'users/GET-ONE',
    async (id,ThunkAPI) => {
        try {
            const res = await fetch(`/api/v1/users/${id}`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                }
            })
            const data = await res.json()
            if(data) return ThunkAPI.fulfillWithValue(data)
        } catch (error) {
            return ThunkAPI.rejectWithValue('cant get users')
        }
    }
)

export const senduser = createAsyncThunk(
    'users/PUT',
    async ({ id, body },ThunkAPI) => {
       try {
            const res = await fetch(`/api/v1/users/${id}`,{
                method:'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                },
                body:JSON.stringify(body)
            })
            const data = res.json()
            if(data) return ThunkAPI.fulfillWithValue()
       } catch (error) {
        return ThunkAPI.rejectWithValue('cant update users')
       }
    }
)
