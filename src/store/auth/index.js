import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, put } from '../../helpers/apiHelper'

// Thunks

export const loginUser = createAsyncThunk('/login-user', async (payload) => {
  return await post('auth/login', payload)
})

export const registerUser = createAsyncThunk('/register-user', async (payload) => {
  return await post('auth/register', payload)
})

export const updateUserProfile = createAsyncThunk('/update-user-profile', async (payload) => {
  return await put('auth/update-profile', payload)
})

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState:  {},
  reducers: {},
  extraReducers () {}
})

// Exporting reducers from slice
export default authSlice.reducer
