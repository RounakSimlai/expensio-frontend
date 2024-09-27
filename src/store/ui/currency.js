import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchExchangeRate = createAsyncThunk('rate/set', async (currency = 'inr', unitSymbol = '₹') => {
  const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
  return {currency, rate: response?.data?.inr, unitSymbol}
})

const CurrencyUISlice = createSlice({
  name: 'currencyUI',
  initialState:  {currency: 'INR', rate: 1, unitSymbol: '₹'},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
  }
})

export default CurrencyUISlice.reducer