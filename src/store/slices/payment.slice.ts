import { createSlice } from '@reduxjs/toolkit'

export const name = 'payment'
export const initialState = {
  product: {},
  creditCard: {},
  loading: false,
  error: null,
}

export const paymentSlice = createSlice({
  name,
  initialState,
  reducers: {
    fillPayment: (state, action) => {
      state.product = action.payload.product
      state.creditCard = action.payload.creditCard
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { fillPayment, setLoading, setError } = paymentSlice.actions

export default paymentSlice.reducer
