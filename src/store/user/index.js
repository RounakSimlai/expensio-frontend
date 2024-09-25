import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del } from '../../helpers/apiHelper'

// Thunks

export const loginUser = createAsyncThunk('/login-user', async (payload) => {
  return await post('user/login', payload)
})

export const registerUser = createAsyncThunk('/register-user', async (payload) => {
  return await post('user/register', payload)
})

export const userMasterList = createAsyncThunk('/user-master-list', async (params = {}) => {
  return await get('user/master/list', {
    params
  })
})

export const addUserMaster = createAsyncThunk('/add-user-master', async (payload) => {
  return await post('user/master/add', payload)
})

export const editUserMaster = createAsyncThunk('/edit-user-master', async (payload) => {
  return await put('user/master/edit', payload)
})

export const deleteUserMaster = createAsyncThunk('/delete-user-master', async (id) => {
  return await del(`user/master/delete/${id}`)
})

// Slice
const usersSlice = createSlice({
  name: 'user',
  initialState:  {},
  reducers: {},
  extraReducers () {}
})

// Exporting reducers from slice
export default usersSlice.reducer
