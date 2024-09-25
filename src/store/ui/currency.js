import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchExchangeRate = createAsyncThunk('rate/set', async (currency = 'INR') => {
  if (currency === 'USD') {
    const response = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json')
    return {currency, rate: response?.data?.inr?.usd, unitSymbol: '$'}
  } else {
    return {currency: 'INR', rate: 1, unitSymbol: '₹'}
  }
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